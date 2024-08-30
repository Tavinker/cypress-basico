describe('CAC TAT - Política de privacidade', function() {

it('22: testa a página da política de privacidade de forma independente',function(){
    //visita o privacy.html manualmente, de forma independente
    cy.visit('src/privacy.html')

    //verifica se o URL está visível, ou seja, se foi possível acessar
    cy.url().should('include', '/src/privacy.html')

    //verifica algum elemento da página para uma segunda validação de que a página está acessível
    cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
    .should('be.visible')
})

})