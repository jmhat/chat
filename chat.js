<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Test</title>
        <style>
            #zone_chat strong {
                color: white;
                background-color: black;
                padding: 2px;
            }
        </style>
    </head>
 
    <body>
        <h1>Test</h1>

        <form action="/" method="post" id="formulaire_chat">
            <input type="text" name="message" id="message" placeholder="Votre message..." size="50" autofocus />
            <input type="submit" id="envoi_message" value="Envoyer" />
        </form>

        <section id="zone_chat">
            
        </section>


        <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
        <script src="/socket.io/socket.io.js"></script>
        <script>

            // Connexion ? socket.io
            var socket = io.connect();

            // On demande le pseudo, on l'envoie au serveur et on l'affiche dans le titre
            var pseudo = prompt('Quel est votre pseudo ?');
            socket.emit('nouveau_client', pseudo);
            document.title = pseudo + ' - ' + document.title;

            // Quand on re?oit un message, on l'ins?re dans la page
            socket.on('message', function(data) {
                insereMessage(data.pseudo, data.message)
            })

            // Quand un nouveau client se connecte, on affiche l'information
            socket.on('nouveau_client', function(pseudo) {
                $('#zone_chat').prepend('<p><em>' + pseudo + ' a rejoint le Chat !</em></p>');
            })

            // Lorsqu'on envoie le formulaire, on transmet le message et on l'affiche sur la page
            $('#formulaire_chat').submit(function () {
                var message = $('#message').val();
                socket.emit('message', message); // Transmet le message aux autres
                insereMessage(pseudo, message); // Affiche le message aussi sur notre page
                $('#message').val('').focus(); // Vide la zone de Chat et remet le focus dessus
                return false; // Permet de bloquer l'envoi "classique" du formulaire
            });
            
            // Ajoute un message dans la page
            function insereMessage(pseudo, message) {
                $('#zone_chat').prepend('<p><strong>' + pseudo + '</strong> ' + message + '</p>');
            }
            
            //Fonction dessin
            socket.on ('dessin', function(){
            	$.getScript( "ajax/test.js", function(){
            		//  console.log( "Load was performed." );
            		});

            	
            })
        </script>
    </body>
</html>