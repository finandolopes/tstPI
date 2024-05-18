<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Aqui será inserido o E-mail para Recebimento
  $receiving_email_address = 'contato@confinter.com.br';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Não é possível carregar a biblioteca "PHP Email Form"!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  $contact->to = $receiving_email_address;
  $contact->from_name = $_POST['nome'];
  $contact->from_email = $_POST['email'];
  $contact->subject = $_POST['assunto'];

  // Remova o comentário do código abaixo se quiser usar SMTP para enviar e-mails. Você precisa inserir suas credenciais SMTP corretas
  /*
  $contact->smtp = array(
    'host' => 'exemplo.com',
    'username' => 'exemplo',
    'password' => 'senha',
    'port' => '587'
  );
  */

  $contact->add_message( $_POST['nome'], 'De');
  $contact->add_message( $_POST['email'], 'Email');
  $contact->add_message( $_POST['mensagem'], 'Mensagem', 10);

  echo $contact->send();
?>
