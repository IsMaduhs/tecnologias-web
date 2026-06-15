const loginForm = document.getElementById('form-login');

loginForm.addEventListener('submit', (event) => {
  // Impede a página de recarregar antes de validarmos
  event.preventDefault();

  const usuarioInput = document.getElementById('email').value;
  const senhaInput = document.getElementById('senha').value;

  // Validação exigida: Usuário e Senha devem corresponder a admin e admin
  if (usuarioInput === 'admin' && senhaInput === 'admin') {
    
    // [Extra]: Salva na sessão local do navegador a variável token=jwt123
    sessionStorage.setItem('token', 'jwt123');
    
    alert('Login realizado com sucesso!');
    
    // Redireciona o usuário para a sua página de Cards de Funkos
    window.location.href = '../index.html'
    
  } else {
    alert('Usuário ou senha incorretos! Tente novamente.');
  }
});