//Configuração inicial do mapa
 
//Aqui estamos definindo a posição inicial do mapa(Brasil)
const mapa = L.map('mapa').setView([-14.235, -51.9253], 4);
 
//adicionamos as imagens de mapa que vem do openstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(mapa);
 
//variavel que armazenará o marcador atual. (como um pim de mapa)
let marcador;
 
// ELEMENTOS DO HTML
const inputCep = document.getElementById('cep');
const btnBuscar = document.getElementById('btnBuscar');
const btnLocalizacao = document.getElementById('btnLocalizacao');
const mensagem = document.getElementById('mensagem');
 
//BUSCAR CEP
//Aqui estamos adicionando um evento ao botão de buscar
btnBuscar.addEventListener('click', async () => {
    //Retiramos os espaços em branco
    const cep = inputCep.value.trim();
    //limpamos a mensagem
    mensagem.textContent = '';
    //validamos se o cep realmente foi informado
    if (!cep) {
        mensagem.textContent = 'informe um cep';
        return;
    }
    try {
        //nossa aplicação frontend vai fazer a consulta para a nossa API
        const resposta = await fetch(`http://localhost:3000/localizacao/cep/${cep}/coordenadas`);
 
        // convertemos a resposta da API para JSON
        const dados = await resposta.json()
        //Se a api retornar ERRO (como o 400 ou o 404), nós devolvemos uma resposta.
        if (!resposta.ok) {
            throw new Error(dados.mensagem || "Não foi possivel realizar a consulta");
        }
        //Vamos mostrar os dados na tela
        preencherInformacoes(dados);
        //(ainda não criamos)
 
        //Vamos atualizar o mapa com as novas informções
        atualizarMapa(
        dados.latitude,
       dados.longitude,
       `${dados.logradouro} - ${dados.cidade}`
       );
     
    } catch (erro) {
        mensagem.textContent = erro.message;
    }
});
 
//Preenchendo as informações do cep na tela
function preencherInformacoes(dados) {
    document.getElementById('resultadoCep').textContent = dados.cep || '-';
    document.getElementById('logradouro').textContent = dados.logradouro || '-';
    document.getElementById('bairro').textContent = dados.bairro || '-'
    document.getElementById('cidade').textContent = dados.cidade || '-';
    document.getElementById('estado').textContent = dados.estado || '-';
    document.getElementById('latitude').textContent = dados.latitude;
    document.getElementById('longitude').textContent = dados.longitude;
}
 function atualizarMapa(latitude, longitude, textoMarcador){
    //Centraliza o mapa na localização
    mapa.setView([latitude,longitude], 15);
    //se existir um marcador no mapa, removemos antes de criar o novo.
    if(marcador){
        mapa.removeLayer(marcador);
    }
    //Assim, podemos criar o novo marcador:
    marcador = L.marker([latitude, longitude])
    .addTo(mapa)
    .bindPopup(textoMarcador)
    .openPopup();
}