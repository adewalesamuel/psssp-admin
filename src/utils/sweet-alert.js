import Swal from "sweetalert2";

const swalWithBootstrapButtons2 = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success ml-4 px-4',
      cancelButton: 'btn btn-default px-4',
      title: "font-medium-1"
    },
    buttonsStyling: false,
    reverseButtons: true
  })

const fireAlert = (action, entity) => {
    return swalWithBootstrapButtons2.fire({
        title: `Confirmation`,
        text: `Voulez vous vraiment ${action} ${entity} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Valider !',
        cancelButtonText: 'Annuler',
      });
}

const firePaymentConfirm = (amount) => {
  return swalWithBootstrapButtons2.fire({
    title: `Confirmer la souscription`,
    text: `Veuillez confirmer le payment de ${amount} Fcfa pour
    completer votre souscription. Vous serez redirigé vers 
    un portail de paiement`,
    icon: 'success',
    showCancelButton: true,
    confirmButtonText: `Confirmer`,
    cancelButtonText: 'Annuler',
  });
}

export const SweetAlert = {
    fireAlert,
    firePaymentConfirm,
}