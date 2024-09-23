/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000
    beforeEach(function() {
        cy.visit('./src/index.html')
    })




// EXERCÍCIOS SEÇÃO 3
    it('01: verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('02: preenche os campos obrigatorios e envia o formulário', function() {

        //Também poderia fazer assim usando o próprio Selector Playground do Cypress:
        //cy.get('#firstName')
        //cy.get('#lastName')
        //cy.get('#email')
        //cy.get('#open-text-area')

        //OBS: Esse "#" (hash) é um ID
        
        const longText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrie s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' 
            cy.get('input[name="firstName"]').type('Gabriel')
            cy.get('input[name="lastName"]').type('Tavares')
            cy.get('input[id="email"]').type('gabriel@teste.com')
            cy.get('textarea[id="open-text-area"]').type(longText, {delay: 0})

            // usando o "cy.contains" no botão pois é outra forma de selecionar elementos. Aqui eu posso passar o tipo de elemento e passar outro parametro dizendo 
            // um texto especifico desse elemento, geralmente um texto único que só ele tem, sendo outra forma de selecionar sem precisar usar o class name ou id, só o label/text e sem o cy.get 
            cy.contains('button', 'Enviar').click()
    })
    
    it('03: exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
            cy.get('#firstName').type('Gabriel')
            cy.get('#lastName').type('Tavares')
            cy.get('#email').type('gabriel123')
            cy.get('#open-text-area').type('teste')

            cy.contains('button', 'Enviar').click()
            cy.get('.error').should('be.visible')
    })

    it('04: ao digitar qualquer caractere que não seja numero no campo telefone, o campo deverá continuar vazio', function() {
        //seleciona o campo > tenta inserir os valores > valida se o campo possui algum valor.
        cy.get('#phone').type('abcd!@#').should('have.value', '');
    })

    it('05: exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        // Preenche os campos obrigatórios, exceto o telefone
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Tavares')
        cy.get('#email').type('gabriel@gmail.com')

        // Seleciona o checkbox "Telefone" e torna o campo acima obrigatório
        cy.get('#phone-checkbox').check();

        // Verifica se o campo telefone está vazio
        cy.get('#phone').should('have.value', '');

        // Submete o formulário sem preencher o telefone
        cy.contains('button', 'Enviar').click()

        // Verifica se a mensagem de erro é exibida
        cy.get('.error').should('be.visible')
    })

    it('06: preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        // Preenche os campos e verifica o valor digitado
        cy.get('#firstName').type('Gabriel').should('have.value', 'Gabriel')
        cy.get('#lastName').type('Tavares').should('have.value', 'Tavares')
        cy.get('#email').type('gabriel@gmail.com').should('have.value', 'gabriel@gmail.com')
        cy.get('#phone').type('11943710020').should('have.value', '11943710020')
            // poderia ser incluso o .clear ainda nesse primeiro bloco de código, na frente do "should('have-value')", assim:
            //cy.get('#firstName').type('Gabriel').should('have.value', 'Gabriel').clear().should('have.value', ''), mas fiz como está abaixo pra melhor identificar a funcionalidade.

        //Limpeza dos campos e verificação se o campo está vazio
        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#phone').clear().should('have.value', '')
    })

    it('07: exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

        //Validando a mensagem de erro contida na tag <strong>
        cy.get('strong').should('contain', 'Valide os campos obrigatórios!')
    })

    it('08: envia o formuário com sucesso usando um comando customizado', function(){
         cy.fillMandatoryFieldsAndSubmit()
         cy.contains('button', 'Enviar').click()
    })






// EXERCÍCIOS SEÇÃO 4

    it('09: seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('10: seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('11: seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })





// EXERCÍCIOS SEÇÃO 5

    it('12: marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]').check()
        .should('have.value', 'feedback')
    })

    //forma iniciante de se fazer (como eu fiz com a minha lógica inicial)
    //it('13: marca cada tipo de atendimento', function() {
        //cy.get('input[type="radio"][value="ajuda"]').check()
        //.should('be.checked')
        
        //cy.get('input[type="radio"][value="elogio"]').check()
        //.should('be.checked')

        //cy.get('input[type="radio"][value="feedback"]').check()
        //.should('be.checked')

    //Forma aprimorada aprendida na aula:
    it('13: marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)                   //verifica qtd de radios que o input contém
        .each(function($radio){                     //.each está recebendo cada um dos valores (radio options) contidos no input "radio"
            cy.wrap($radio).check()                 //cy.wrap aqui está reunindo todos os radio options contidos no $radio e em seguida o .check() irá marcar cada um deles
            cy.wrap($radio).should('be.checked')    //cy.wrap aqui está novamente reunindo todos os radios options contidos no $radio, mas agora, com o .should('be.checked) está verificando se tudo foi marcado pelo .check() anteriormente
        })
    })

    //OBS: O cy.wrap empacota os valores. O que isso significa? basicamente, ele percorre cada um dos valores e realiza a ação que quisermos.
    //No caso do exercício acima, o primeiro wrap empacotou e marcou cada radio button na ordem
    //Logo em seguida, o cy.wrap faz uma verificação se o radio button marcado anteriormente realmente foi marcado, e assim, segue pros demais valores.





// EXERCÍCIOS SEÇÃO 6

    it('14: marca ambos checkboxes, depois desmarca o último', function() {
        
    //Pode ser feito de uma forma mais passo a passo igual eu fiz:
        //cy.get('input[type="checkbox"][value="email"]')
        //.check()
        //.should('be.checked')

        //cy.get('input[type="checkbox"][value="phone"]')
        //.check()
        //.should('be.checked')
        
        //cy.get('input[type="checkbox"]').last() 
        //.uncheck()
        //.should('not.be.checked')

    //Ou pode ser feito como o professor fez:
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })


    it('15: exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#phone-checkbox').check()
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('strong').should('contain', 'Valide os campos obrigatórios!')
        //posso fazer tbm: cy.get('.error').should('be.visible')
        
        cy.get('#phone').should('have.value', '')
    })





// EXERCÍCIOS SEÇÃO 7

    it('16: seleciona um arquivo da pasta fixtures',function(){
        
        //posso fazer assim: (fiz dessa forma sozinho)
        //cy.get('#file-upload')
            //.should('not.have.value')
            //.attachFile('example.json')

        //cy.get('#file-upload')
            //.should('have.prop', 'files')
            //.should('have.length', 1)
            //.its('0.name')
            //.should('eq', 'example.json')

        //ou posso fazer conforme a aula:
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
            //console.log($input)
    })


    it('17: seleciona um arquivo simulando um drag-and-drop',function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })


    it('18: seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
        // Carrega a fixture e dá um alias para ela
        cy.fixture('example.json').as('aula-cypress')
        
        // Seleciona o arquivo utilizando o alias
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@aula-cypress')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })    





// EXERCÍCIOS SEÇÃO 8
   it('19: verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      //pode ser feito: cy.get('a[target="_blank"][href="privacy.html"]')  
      cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')

      //'have.attr' = verifica se temos um atributo (elemento html) específico na página, e na frente, colocamos o atribuo (elemento) + seu valor se for necessário. 
      //Nesse exemplo acima, buscamos na página o elemento "#privacy a" que possui o atríbuto 'target' e que contém o valor '_blank' (target _blank = usado para abrir links em outra aba).
   })


   it('20: acessa a página da política de privacidade removendo o target e então clicando no link',function(){
    //OBS: esse teste só é possível se o link aberto em outra aba for do mesmo domínio da página inicial. Se abrir outro site em outro domínio, é impossível realizar o teste dessa forma!    

        // Remove o atributo target para que o link seja aberto na mesma aba
        cy.get('#privacy a')
        .invoke('removeAttr', 'target') 
        .click()
        
        //Verifica se a URL mudou para a página de política de privacidade
        cy.url().should('include', '/src/privacy.html') 

        // Espera que o texto específico esteja visível na página
        cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
        .should('be.visible')
   })


   it('21: testa a página da política de privacidade de forma independente',function(){
        //OBS: posso tanto fazer aqui, ou, tornar o teste ainda mais independente criando um arquivo a parte, que é o: private.spec.js
    
        //visita o privacy.html manualmente, de forma independente
        cy.visit('src/privacy.html')

        //verifica se o URL está visível, ou seja, se foi possível acessar
        cy.url().should('include', '/src/privacy.html')

        //verifica algum elemento da página para uma segunda validação de que a página está acessível
        cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
        .should('be.visible')
   })




// EXERCÍCIOS SEÇÃO 12
it('23: testa se as mensagens de sucesso e erro aparecem e que desaparecem após 3 segundos, sem precisar esperar pelos 3 segundos.',function(){
    
    //congela o tempo do navegador (ações com tempo determinado não acontecem, ficam congeladas, por exemplo, exibição da mensagem de sucesso/erro)
    cy.clock()

        //Envia o formulário corretamente e dispara a mensagem de sucesso
        cy.fillMandatoryFieldsAndSubmit()
    
        //Checa se a mensagem de sucesso é exibida
        cy.get('.success').should('be.visible')

        //Avança 3 segundos no tempo (forço que o tempo do navegador que está congelado, avance 3 segundos manualmente)
        cy.tick(3000) //basicamente, essa funcionalidade serve para ganhar tempo nos testes. Ao invés de eu esperar 3 segundos pra mensagem desaparecer, eu já forço isso instantaneamente.

        //Checa se a mensagem de sucesso não é mais exibida após 3 segundos
        cy.get('.success').should('not.be.visible')

        //Preenchendo apenas um dos campos obrigatórios e enviando a requisição, forçando a exibição da mensagem de erro e em seguida, validando se ela aparece
        cy.get('#firstName').type('Gabriel')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

        //Avançando 3 segundos no tempo para que a mensagem suma
        cy.tick(THREE_SECONDS_IN_MS) //aqui to usando uma variavel, mas também poderia colocar o valor em milisegundos manualmente

        //Checa se a mensagem de erro não é mais exibida
        cy.get('.error').should('not.be.visible')

    })


Cypress._.times(5, () => { // Usando Cypress._.times para repetir a verificação várias vezes (por exemplo, 5 vezes). Posso fazer isso pro teste todo ou para algum bloco específico dentro do teste
    it('24: usando o Cypress._.times() para que o teste se repita 5x, testa se as mensagens de sucesso e erro aparecem e que desaparecem após 3 segundos, sem precisar esperar pelos 3 segundos.',function(){
    
        //congela o tempo do navegador (ações com tempo determinado não acontecem, ficam congeladas, por exemplo, exibição da mensagem de sucesso/erro)
        cy.clock()
    
            //Envia o formulário corretamente e dispara a mensagem de sucesso
            cy.fillMandatoryFieldsAndSubmit()
        
            //Checa se a mensagem de sucesso é exibida
            cy.get('.success').should('be.visible')
    
            //Avança 3 segundos no tempo (forço que o tempo do navegador que está congelado, avance 3 segundos manualmente)
            cy.tick(3000) //basicamente, essa funcionalidade serve para ganhar tempo nos testes. Ao invés de eu esperar 3 segundos pra mensagem desaparecer, eu já forço isso instantaneamente.
    
            //Checa se a mensagem de sucesso não é mais exibida após 3 segundos
            cy.get('.success').should('not.be.visible')
    
            //Preenchendo apenas um dos campos obrigatórios e enviando a requisição, forçando a exibição da mensagem de erro e em seguida, validando se ela aparece
            cy.get('#firstName').type('Gabriel')
            cy.contains('button', 'Enviar').click()
            cy.get('.error').should('be.visible')
    
            //Avançando 3 segundos no tempo para que a mensagem suma
            cy.tick(THREE_SECONDS_IN_MS) //aqui to usando uma variavel, mas também poderia colocar o valor em milisegundos manualmente
    
            //Checa se a mensagem de erro não é mais exibida
            cy.get('.error').should('not.be.visible')
        
             })
        })


    it('25: usando o Cypress._.repeat() para repetir a string 20x, preencha os campos obrigatorios + text-area, envia o formulário e checa se a mensagem de sucesso aparece', function() {
        
        //constante definindo os parâmetros da função "Cypress._.repeat"
        const repeatText = Cypress._.repeat('0123456789  ', 20); //a função "Cypress._.repeat" define o números de vezes que uma string será repetida em uma campo.
        
        //preenchendo normalmente os demais campos obrigatórios
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Tavares')
        cy.get('#email').type('gabriel@teste.com')

        //preenchendo o campo text-area utilizando a varíavel contida na função "Cypress._.repeat"
        cy.get('#open-text-area').type(repeatText, {delay: 0})

        //enviando o formulario
        cy.contains('button', 'Enviar').click()

        //checando se a mensagem de success aparece!
        cy.get('.success').should('be.visible')
    })
    
    
    it('26: exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')

        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })


      it('27: preenche a area de texto usando o comando invoke', function() {
        const invokeValue = Cypress._.repeat('Preenchendo campo de texto através do .invoke ', 5) //definindo o valor do invoke através de variável "invokeValue" e ao mesmo tempo usando o ".repeat" para repetir esse valor no campo de texto, para dar volume de texto no campo.
        //o invoke é como se fosse um CTRL + V, serve para dar velocidade no preenchimento de campos (input ou textarea).

        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Tavares')
        cy.get('#email').type('gabriel@teste.com')

        cy.get('#open-text-area').invoke('text', invokeValue) //usando variável "invokeValue" para preencher o campo de texto com um valor pré-definido
        .should('have.text', invokeValue) //checando se o campo possui o valor que está na variável "invokeValue"
      })


      it('28: faz uma requisição HTTP', function() {
        
        //Pode ser feito dessa forma (como eu fiz)
        //cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            //.then((response) => {
            //    expect(response.status).to.equal(200);
            //    expect(response.statusText).to.equal('OK');
            //    expect(response.body).to.include('CAC TAT')
            //})

        //Ou pode ser feito assim (feito pelo professor)
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response) {
                //console.log() -- visualizando o que vem na request no browser
                const { status, statusText, body } = response //desestruturando um objeto em javaScript
                expect(response.status).to.equal(200);
                expect(response.statusText).to.equal('OK');
                expect(response.body).to.include('CAC TAT')
            })
    })
    
    
    it('29: encontra o gato escondido', function (){
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
        cy.get('#title')
            .invoke('text', 'CAT TAT')
        cy.get('#subtitle')
            .invoke('text', 'Eu 💚 gatos!')
    })
})