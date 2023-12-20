async function loadNav() {
  const navbarDiv = document.getElementById('navbar');

  try {
    //usando Fetch para buscar o conteúdo da barra de navegação
    const response = await fetch('../navbar/navbar.html');

    if (response.ok) {
      const navbarHTML = await response.text();
      navbarDiv.innerHTML = navbarHTML;
    } else {
      throw Error('Erro ao carregar a barra de navegação');
    }
  } catch (error) {
    console.error(error);
  }
}

loadNav();
