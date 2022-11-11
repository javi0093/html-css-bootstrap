$(function () {
    $("[data-bs-toggle='tooltip']").tooltip();
    $("[data-bs-toggle='popover']").popover();
    $('.carousel').carousel({interval: 2000});
   });

   $('#modalreservar2').on('show.bs.modal', function (e){
       console.log('el modal se está mostrando');

       $('#btnreservamodal2').removeClass('btn-outline-success');
       $('#btnreservamodal2').addClass('btn-primary');
       $('#btnreservamodal2').prop('disabled',true);

   })
   $('#modalreservar').on('shown.bs.modal', function (e){
       console.log('el modal se mostró');
   })
   $('#modalreservar').on('hide.bs.modal', function (e){
       console.log('el modal se está ocultando');
   })
   $('#modalreservar2').on('hidden.bs.modal', function (e){
       console.log('el modal se ocultó');
       $('#btnreservamodal2').removeClass('btn-primary');
       $('#btnreservamodal2').addClass('btn-outline-success');
       $('#btnreservamodal2').prop('disabled',false);
   })