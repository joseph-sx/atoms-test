
$(document).ready(function () {
    let instancia_monto = $("#monto-deseado");
    let instancia_tasa = $("#tasa-anual");
    let tasaAnual = 8.9;
    let comApertura = 348;
    let cat = 15.71;
    let plazo = 12;



    function updateData(monto, meses, comision, tasa, cat) {
        let mensualidad = (monto + per(monto, tasa) - comision) / meses;
        let totalPagar = ((monto - comision) + (per(monto, tasa)));
        $(".datos span.comision").text(comision);
        $(".datos span.cat").text(cat);
        $(".datos span.neto-depositado").text(monto - comision);
        $(".datos span.mensualidad").text(mensualidad.toFixed(2));
        $(".datos span.total-pagar").text(totalPagar);

    }
    console.log("ready!");
    instancia_monto.ionRangeSlider({
        skin: "round",
        min: 10000,
        max: 100000,
        step: 5000,
        prefix: "$",
        onStart: function (data) {
            console.log(data);
            updateData(data.from, plazo, comApertura, tasaAnual, cat)
        },
        onFinish: function (data) {
            console.log(data.from)
            updateData(data.from, plazo, comApertura, tasaAnual, cat)
        }


    });
    instancia_tasa.ionRangeSlider({
        min: 8.9,
        max: 26.7,
        step: 8.9,
        skin: "round",
        block: true,
        postfix: "%"
    });

    $(".plazos a.button").click(function (e) {
        let plazos =  $(this).data("plazo");
        tasa = new Array();
        tasa[12] = 8.9;
        tasa[24] = 17.8;
        tasa[36] = 26.7;

        e.preventDefault();
        $('.plazos a.button').removeClass('seleccionado');
        $(this).addClass('seleccionado');
        console.log($(this).data("plazo"));
        updateData(instancia_monto.data("ionRangeSlider").old_from,plazos,comApertura,tasa[plazos],cat);
        var o = {
            from: tasa[plazos]
        }

        instancia_tasa.data("ionRangeSlider").update(o);

    });

    $(".faq-widget h4").click(function (e) {
        e.preventDefault();
        $('.faq-widget h4').removeClass('faq-active-tit');
        $('.faq-widget div').removeClass('faq-active-content')
        $(this).next().addClass('faq-active-content');
        $(this).addClass('faq-active-tit');
    });
});
function per(monto, porcentaje) {
    return (porcentaje / 100) * monto;
}