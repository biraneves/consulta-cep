// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('btn-buscar-cep').addEventListener('click', () => {
//         // AJAX - Asynchronous JavaScript and XML
//         const xhttp = new XMLHttpRequest();
//         const cep = document.getElementById('cep').value;
//         const endpoint = `https://viacep.com.br/ws/${cep}/json`;

//         xhttp.open('GET', endpoint);
//         xhttp.send();
//     });
// });

$(document).ready(() => {
    $('#cep').mask('00000-000');

    $('#btn-buscar-cep').click(e => {
        const cep = $('#cep').val();
        const endpoint = `https://viacep.com.br/ws/${cep}/json`;
        const botao = e.target;

        $(botao).find('.bi').addClass('d-none');
        $(botao).find('.spinner-border').removeClass('d-none');

        // $.ajax(endpoint).done(response => {
        //     const logradouro = response.logradouro;
        //     const bairro = response.bairro;
        //     const cidade = response.localidade;
        //     const estado = response.uf;
        //     const endereco = `${logradouro}, ${bairro}, ${cidade}/${estado}`;

        //     setTimeout(() => {
        //         $('#endereco').val(endereco);
        //         $('#numero').focus();

        //         $(botao).find('.bi').removeClass('d-none');
        //         $(botao).find('.spinner-border').addClass('d-none');
        //     }, 1000);
        // });
        fetch(endpoint)
            .then(response => response.json())
            .then(res => {
                const logradouro = res.logradouro;
                const bairro = res.bairro;
                const cidade = res.localidade;
                const estado = res.uf;
                const endereco = `${logradouro}, ${bairro}, ${cidade}/${estado}`;

                $('#endereco').val(endereco);
                $('#numero').focus();
            })
            .catch(error => {
                alert('Ocorreu um erro ao buscar o endereço. Tente novamente mais tarde.');
            })
            .finally(() => {
                setTimeout(() => {
                    $(botao).find('.bi').removeClass('d-none');
                    $(botao).find('.spinner-border').addClass('d-none');
                }, 1500);
            });
    });

    $('#formulario-pedido').submit(e => {
        e.preventDefault();

        if ($('#nome').val().length == 0) {
            throw new Error('O nome deve ser informado');
        }
    });
});
