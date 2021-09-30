/* criando a Nav e inserindo nos arquivos html */
let header = `
            <nav>
                <a href="index.html"><img src="./img/logo.png" class="logo" alt="Botão Logo" title="to-do"></a>
                <a href="api.html"><img src="./img/pombo.png" class="logo" alt="Botão Api" title="link-api"></a>
                <a href="#" class="botao"><img src="./img/velaAcesa.png" class="logo" id="vela" alt="dark-mode"                    title="dark-mode"></a>
            </nav>
`;
document.body.querySelector('header').innerHTML = header;


/* implementando darkmode */
const html = document.querySelector('html');
const botao = document.querySelector('.botao');
const vela = document.getElementById('vela');
botao.addEventListener('click', function(){
    html.classList.toggle('dark-mode');
    if (html.classList == 'dark-mode'){
        vela.setAttribute('src', './img/velaApagada.png');
    } else {
        vela.setAttribute('src', './img/velaAcesa.png');
    }
})

/* implementando o footer e inserindo no html */
let footer = `
            <a href="https://www.digitalhouse.com/br/" target="_blank"><img src="./img/DH.png" alt="Logo/Link DH"></a>
            <a href="https://www.digitalhouse.com/br/bolsas/certifiedtechdeveloper" target="_blank"><img src="./img/ctd.png" alt="Logo/Link CTD"></a>
            <p>Copycenter - Todos os direitos liberados!</p>
            <a href="https://www.linkedin.com/in/nelsonkobayashi/" target="_blank"><img src="./img/linkedIn_PNG38.png" alt="Logo/Link Linkedin"></a>
            <a href="https://github.com/NelsonKobayashi" target="_blank"><img src="./img/github-logo.png" alt="Logo/Link Github"></a>
`
document.body.querySelector('footer').innerHTML = footer;

