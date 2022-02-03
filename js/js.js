function start() {//quando a funcao for chamada. ela ira ocultar a div inicio e ira criar as demais divs
    $('#inicio').hide();//oculta a div inicio

    $('#fundoGame').append('<div id="jogador" class="anima1"></div>');//adiciona o personagem no fundo do jogo
    $('#fundoGame').append('<div id="inimigo1" class="anima2"></div>');//adiciona o inimigo no fundo do jogo
    $('#fundoGame').append('<div id="inimigo2" ></div>');//adiciona o inimigo no fundo do jogo
    $('#fundoGame').append('<div id="amigo" class="anima3"></div>');//adiciona o amigo no fundo do jogo
    $("#fundoGame").append("<div id='placar'></div>");//adiciona o placar no fundo do jogo
    $("#fundoGame").append("<div id='energia'></div>");//adiciona a energia no fundo do jogo

    //Principais variaveis do jogo

    var jogo = {}//cria um objeto jogo
    var velocidade = 5;//cria uma variavel velocidade
    var energiaAtual=3;//cria uma variavel energiaAtual
    var pontos=0;
    var salvos=0;
    var perdidos=0;
    velocidadeInimigo2 = 3;//cria uma variavel velocidade do inimigo2
    velocidadeAmigo = 1;//cria uma variavel velocidade do amigo
    var posicaoY = parseInt(Math.random() * 334);//cria uma variavel posicaoY que recebe um numero aleatorio entre 0 e 334))
    var podeAtirar = true;//cria uma variavel podeAtirar que recebe true
    var fimdejogo = false;//cria uma variavel fimdejogo que recebe false
    
    var TECLA = {
        W: 87,
        S: 83,
        D: 68
    }

    jogo.pressionou = [];//cria um array para guardar as teclas que foram pressionadas

    var somDisparo=document.getElementById("somDisparo");
    var somExplosao=document.getElementById("somExplosao");
    var musica=document.getElementById("musica");
    var somGameover=document.getElementById("somGameover");
    var somPerdido=document.getElementById("somPerdido");
    var somResgate=document.getElementById("somResgate");

    //Música em loop
    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();
    
    //Verifica se o usuario pressionou alguma tecla

    $(document).keydown(function (e) {//quando o usuario pressionar alguma tecla
    jogo.pressionou[e.which] = true;//guarda a tecla que foi pressionada
    });

    $(document).keyup(function (e) {//quando o usuario soltar a tecla
    jogo.pressionou[e.which] = false;//guarda a tecla que foi solta
    });

    //Game Loop

    jogo.timer = setInterval(loop, 30);//cria um timer de 30 milisegundos

    function loop() {
        movefundo();//chama a funcao movefundo
        movejogador();//chama a funcao movejogador
        moveinimigo1();//chama a funcao moveinimigo1
        moveinimigo2();//chama a funcao moveinimigo2
        moveamigo();//chama a funcao moveamigo
        colisao();//chama a funcao colisao
        placar();//chama a funcao placar
        energia();//chama a funcao energia
    }

    function movefundo() {
        esquerda = parseInt($('#fundoGame').css('background-position'));//pega a posicao da imagem de fundo
        $('#fundoGame').css('background-position', esquerda - 1);//muda a posicao da imagem de fundo
    }

    function movejogador() {
        if (jogo.pressionou[TECLA.W]) {//se a tecla W for pressionada
            var topo = parseInt($('#jogador').css('top'));//pega a posicao do personagem
            $('#jogador').css('top', topo - 10);//muda a posicao do personagem
                
                if(topo<=0){//se o personagem sair da tela
                    $('#jogador').css('top', 0);//muda a posicao do personagem
                }
        }
        if (jogo.pressionou[TECLA.S]) {//se a tecla S for pressionada
            var topo = parseInt($('#jogador').css('top'));//pega a posicao do personagem
            $('#jogador').css('top', topo + 10);//muda a posicao do personagem
            
                if(topo>=434){//se o personagem sair da tela
                    $('#jogador').css('top', 434);//muda a posicao do personagem
                }
        }
        if (jogo.pressionou[TECLA.D]) {//se a tecla D for pressionada
            disparo();//chama a funcao disparo
        }
    }

    function moveinimigo1() {
        posicaoX = parseInt($('#inimigo1').css('left'));//pega a posicao do inimigo
        $('#inimigo1').css('left', posicaoX - velocidade);//muda a posicao do inimigo
        $('#inimigo1').css('top', posicaoY);//muda a posicao do inimigo com um valor randomico
    
            if (posicaoX <= 0) {//se o inimigo sair da tela
                posicaoY = parseInt(Math.random() * 334);//cria uma variavel posicaoY que recebe um numero aleatorio entre 0 e 334))
                $('#inimigo1').css('left', 694);//muda a posicao do inimigo para valor inicial novamente
                $('#inimigo1').css('top', posicaoY);//muda a posicao de spaw do inimigo com um valor randomico no eixo Y
            }
    }

    function moveinimigo2() {
        posicaoX = parseInt($('#inimigo2').css('left'));//pega a posicao do inimigo
        $('#inimigo2').css('left', posicaoX - velocidadeInimigo2);//muda a posicao do inimigo
        
        if (posicaoX <= 0) {//se o inimigo sair da tela
            $('#inimigo2').css('left', 775);//muda a posicao do inimigo para valor inicial novamente
        }
    }

    function moveamigo() {
        posicaoX = parseInt($('#amigo').css('left'));//pega a posicao do amigo
        $('#amigo').css('left', posicaoX + velocidadeAmigo);//muda a posicao do amigo
        
        if (posicaoX > 906) {//se o amigo sair da tela
            $('#amigo').css('left', 0);//muda a posicao do amigo para valor inicial novamente
        }
    }

    function disparo() {
        if (podeAtirar==true) {

            somDisparo.play();//tocar som disparo
            podeAtirar = false;//muda a variavel podeAtirar para false
            topo = parseInt($('#jogador').css('top'));//pega a posicao do personagem no eixo Y
            posicaoX = parseInt($('#jogador').css('left'));//pega a posicao X do personagem
            tiroX = posicaoX + 190;//cria uma variavel tiroX que recebe a posicao X do personagem mais 100
            topoTiro = topo + 47;//cria uma variavel topoTiro que recebe a posicao do personagem mais 50
            $('#fundoGame').append('<div id="disparo"></div>');//cria um div com id disparo
            $('#disparo').css('top', topoTiro);//posicionando o disparo com a variavel topoTiro
            $('#disparo').css('left', tiroX);//posicionando o disparo com a variavel tiroX
        
            var tempoDisparo = window.setInterval(executaDisparo, 30);//cria um timer de 50 milisegundos
        }

        function executaDisparo() {
            posicaoX = parseInt($('#disparo').css('left'));//pega a posicao atual do disparo quando ela parece
            $('#disparo').css('left', posicaoX + 15);//faz a posicao do disparo aumentar em 15
        
            if(posicaoX>900){
                window.clearInterval(tempoDisparo);//para o timer
                tempoDisparo=null;//limpa o timer
                $('#disparo').remove();//remove o disparo
                podeAtirar = true;//muda a variavel podeAtirar para true
            }
        }
    }

    function colisao() {
        var colisao1 = ($('#jogador').collision($('#inimigo1')));//verifica se o personagem colidiu com o inimigo1
        var colisao2 = ($("#jogador").collision($("#inimigo2")));//verifica se o personagem colidiu com o inimigo2
        var colisao3 = ($("#disparo").collision($("#inimigo1")));//verifica se o disparo colidiu com o inimigo1
        var colisao4 = ($("#disparo").collision($("#inimigo2")));//verifica se o disparo colidiu com o inimigo2
        var colisao5 = ($("#jogador").collision($("#amigo")));//verifica se o personagem colidiu com o amigo
        var colisao6 = ($("#inimigo2").collision($("#amigo")));//verifica se o inimigo2 colidiu com o amigo

        if (colisao1.length > 0) {//se o personagem colidiu com o inimigo1
            
            energiaAtual--;//diminui a energia do personagem
            inimigo1X = parseInt($('#inimigo1').css('left'));//pega a posicao do inimigo1 em X
            inimigo1Y = parseInt($('#inimigo1').css('top'));//pega a posicao do inimigo1 em Y
            explosao1(inimigo1X, inimigo1Y);//chama a funcao explosao
           
            posicaoY = parseInt(Math.random() * 334);//cria uma variavel posicaoY que recebe um numero aleatorio entre 0 e 334))
            $('#inimigo1').css('left', 694);//muda a posicao do inimigo para valor inicial novamente
            $('#inimigo1').css('top', posicaoY);//muda a posicao de spaw do inimigo com um valor randomico no eixo Y
        }

        if (colisao2.length>0) {

            energiaAtual--;//diminui a energia do personagem
            inimigo2X = parseInt($("#inimigo2").css("left"));//armazena a posicao do inimigo2 em X
            inimigo2Y = parseInt($("#inimigo2").css("top"));//armazena a posicao do inimigo2 em Y
            explosao2(inimigo2X,inimigo2Y);//chama a funcao explosao2
                    
            $("#inimigo2").remove();
                
            reposicionaInimigo2();       
        }

        // Disparo com o inimigo1
	    if (colisao3.length>0) {
            
            velocidade+=0.5;//aumenta a velocidade do inimigo1 para dificultar o jogo
            pontos+=100;//aumenta os pontos
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));    
            explosao1(inimigo1X,inimigo1Y);
            $("#disparo").css("left",950);
                
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);  
        }

        // Disparo com o inimigo2
	    if (colisao4.length>0) {
            
            pontos+=50;
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();
        
            explosao2(inimigo2X,inimigo2Y);
            $("#disparo").css("left",950);
            reposicionaInimigo2();   
        }

        // jogador com o amigo
		
	    if (colisao5.length>0) {
            somResgate.play();
            salvos++;
            reposicionaAmigo();
            $("#amigo").remove();
        }

        //Inimigo2 com o amigo
		
        if (colisao6.length>0) {
            
            perdidos++;
            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));
            explosao3(amigoX,amigoY);
            $("#amigo").remove();
                    
            reposicionaAmigo();
        }
    }

    function explosao1(inimigo1X, inimigo1Y) {
        somExplosao.play();
        $('#fundoGame').append('<div id="explosao1"></div>');//cria um div com id explosao1
        $('#explosao1').css('background-image', 'url(imgs/explosao.png)');//muda a imagem do div explosao1
        var div = $('#explosao1');//cria uma variavel div que recebe o div explosao1
        div.css('top', inimigo1Y);//indica onde vai ser a explosao1
        div.css('left', inimigo1X);//indica onde vai ser a explosao1
        div.animate({width:200, opacity:0}, 'slow');//faz o div explosao1 aumentar de tamanho e desaparecer

        var tempoExplosao = window.setInterval(removeExplosao1, 1000);//cria um timer de 1000 milisegundos

        function removeExplosao1() {
            div.remove();//remove o div explosao1
            window.clearInterval(tempoExplosao);//para o timer
            tempoExplosao=null;//limpa o timer
        }
    }

    //Reposiciona Inimigo2
	
	function reposicionaInimigo2() {
	
        var tempoColisao4=window.setInterval(reposiciona4, 5000);//cria um timer de 5000 milisegundos
            
        function reposiciona4() {//funcao reposiciona4
        window.clearInterval(tempoColisao4);//para o timer
        tempoColisao4=null;//limpa o timer
            if (fimdejogo==false) {//se o fim de jogo for false
                $("#fundoGame").append("<div id=inimigo2></div");//cria um div com id inimigo2
            }
        }	
    }	

    //Explosão2
	
	function explosao2(inimigo2X,inimigo2Y) {
        somExplosao.play();
        $("#fundoGame").append("<div id='explosao2'></div");
        $("#explosao2").css("background-image", "url(imgs/explosao.png)");
        var div2=$("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({width:200, opacity:0}, "slow");
        
        var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
        function removeExplosao2() {
            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2=null;
        }
    }

    //Reposiciona Amigo
	
	function reposicionaAmigo() {
	
        var tempoAmigo=window.setInterval(reposiciona6, 6000);
            function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo=null;
            
            if (fimdejogo==false) {
                $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
            }
        }
    }

    //Explosão3
	
    function explosao3(amigoX,amigoY) {
        somPerdido.play();
        $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
        $("#explosao3").css("top",amigoY);
        $("#explosao3").css("left",amigoX);
        var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
        function resetaExplosao3() {
        $("#explosao3").remove();
        window.clearInterval(tempoExplosao3);
        tempoExplosao3=null;   
        }
    }   

    function placar() {
        $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
    }

    function energia() {
		if (energiaAtual==3) {
			$("#energia").css("background-image", "url(imgs/energia3.png)");
		} else if (energiaAtual==2) {	
			$("#energia").css("background-image", "url(imgs/energia2.png)");
		} else if (energiaAtual==1) {
			$("#energia").css("background-image", "url(imgs/energia1.png)");
		} else {
			$("#energia").css("background-image", "url(imgs/energia0.png)");
			gameOver();
		}
    }

    //Função GAME OVER
	function gameOver() {
        fimdejogo=true;//fim de jogo
        musica.pause();//pausa a musica
        somGameover.play();//toca o som gameover
        
        window.clearInterval(jogo.timer);//para o timer
        jogo.timer=null;//limpa o timer
        
        $("#jogador").remove();//remove o jogador
        $("#inimigo1").remove();//remove o inimigo1
        $("#inimigo2").remove();//remove o inimigo2
        $("#amigo").remove();//remove o amigo
        
        $("#fundoGame").append("<div id='fim'></div>");//cria um div com id fim
        
        $("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
    }
}

//Reinicia o Jogo
function reiniciaJogo() {
    somGameover.pause();
    $("#fim").remove();//remove o div fim
    start();//chama a função start
}