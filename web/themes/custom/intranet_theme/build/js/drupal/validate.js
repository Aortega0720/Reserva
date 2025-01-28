(function ($, Drupal) {
  $("form[id*=webform-submission-reserva-node]").validate({
    ignore: [],
    rules: {
      pusto_trabajo: {
        required: true,
      },
      usuario: {
        required: true,
      },
      departamento: {
        required: true,
      },
      turno: {
        required: true,
      },
      fecha: {
        required: true,
      },
      observacion: {
        required: true,
      },
       
    },

    messages: {
      pusto_trabajo: {
        required: "Debes ingresar El puesto de trabajo",
      },
      usuario: {
        required: "Debes ingresar el nombre del usuario",
      },
      departamento: {
        required: "Debes ingresar el departamento del usuario",
      },
      turno: {
        required: "Debes ingresar el turno del usuario",
      },
      fecha: {
        required: "Debes ingresar la fecha de la reserva",
      },
      observacion: {
        required: "Debes ingresar una observación",
      },
    },
  });
  $("form[id*=user-login-form]").validate({
    ignore: [],
    rules: {
      name: {
        required: true,
        email: true,
        emailname: true,
        email_exists: true,
        emailDomainRestriction: true,
      },
      pass: {
        required: true,
      },
    },

    messages: {
      name: {
        required: "Debes ingresar tu nombre",
        email: "Ingresa un correo electrónico válido",
        email_exists: "La dirección de correo que ingresaste ya fue registrada",
      },
      pass: {
        required: "Debes ingresar una contraseña",
      },
    },
  });
})(jQuery, Drupal);
