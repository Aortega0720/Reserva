<?php

namespace Drupal\rmbc_reserva_core\Plugin\WebformHandler;

use Drupal\webform\Plugin\WebformHandlerBase;
use Drupal\webform\WebformSubmissionInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\node\Entity\Node;

/**
 * Envio de correo de confirmación Email PQR.
 *
 * @WebformHandler(
 *   id = "reserval_handler",
 *   label = @Translation("Reserva Handler"),
 *   category = @Translation("Custom"),
 *   description = @Translation("EControla la validacion de la reserva."),
 *   cardinality = \Drupal\webform\Plugin\WebformHandlerInterface::CARDINALITY_SINGLE,
 *   submission = \Drupal\webform\Plugin\WebformHandlerInterface::SUBMISSION_REQUIRED,
 * )
 */

 class ReservaWebformHandler extends WebformHandlerBase { 

    /**
     * {@inheritdoc}
     */
    public function validateForm(array &$form, FormStateInterface $form_state, WebformSubmissionInterface $webform_submission)
    {
        
        $dataValues = $webform_submission->getData();
        $dataReserva = $this->isReserva('fecha', $dataValues['fecha'], "reserva");

        $coincidencias = 0;

        foreach ($dataReserva as $item) {
            if ($item->name == 'fecha' && $item->value == $dataValues['fecha']) {
                foreach ($dataReserva as $subItem) {
                    if ($subItem->name == 'nid' && $subItem->value == $dataValues['nid']) {
                        foreach ($dataReserva as $turnoItem) {
                            if ($turnoItem->name == 'turno' && $turnoItem->value == $dataValues['turno']) {
                                $coincidencias++;
                            }
                        }
                    }
                }
            }
        }
        
        \Drupal::logger(__FUNCTION__)->info(print_r($dataReserva, true));
        \Drupal::logger(__FUNCTION__)->info("Número de coincidencias: " . $coincidencias);

        if ($coincidencias >= 1) {
            $form_state->setErrorByName('fecha', $this->t('Fecha bloqueada para este turno: @fecha', ['@fecha' => $dataValues['fecha']]));
        }
        
    }

    /**
     * {@inheritdoc}
     *
     * @throws \Exception
     */
    public function postSave(WebformSubmissionInterface $webform_submission, $update = true)
    {
        $cupos = $webform_submission->getElementData('cupo');
        $nid = $webform_submission->getElementData('nid');
        // \Drupal::logger(__FUNCTION__)->info(json_encode([
        //     'cupos' => $cupos,
        //     'nid' => $nid,
        //   ]));

        $this->actualizarCupoPuesto($nid, $cupos);
    }

    /**
     * Is duplicate function.
     */
    public function isReserva($field, $value, $form) {

        $connection = \Drupal::database();
        $query = $connection->select('webform_submission_data', 's');
        $query->join('webform_submission_data', 'camp', 'camp.sid = s.sid');
        $results = $query
            ->fields('camp',['sid', 'name', 'value'])
            ->condition('s.name', $field)
            ->condition('s.value', $value)
            ->condition('s.webform_id', $form)
            ->execute()
            ->fetchAll();
       
        return $results;
    }


    /**
 * Actualiza la cantidad de cupo para un nodo de tipo puesto.
 *
 * @param int $nid
 *   El ID del nodo de tipo puesto.
 * @param int $nuevo_cupo
 *   El nuevo valor para el campo cupo.
 */
function actualizarCupoPuesto($nid, $valor) {
    $node = Node::load($nid);
    if ($node && $node->bundle() == 'puesto') {
      $cupo_actual = $node->get('field_cupo')->value;
      $nuevo_cupo = $cupo_actual - $valor;

      if ($nuevo_cupo < 0) {
        $nuevo_cupo = 0;
      }

      $node->set('field_cupo', $nuevo_cupo); 
      $node->save();
    //   \Drupal::messenger()->addMessage($this->t('El campo cupo ha sido actualizado a @nuevo_cupo.', ['@nuevo_cupo' => $nuevo_cupo]));
    }
    else {
      \Drupal::messenger()->addError($this->t('El nodo no existe o no es del tipo "puesto".'));
    }
  }

    
 }