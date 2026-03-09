describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test U.',
      username: 'testu',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user) 
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input').first().type('testu')
      cy.get('input').last().type('password')
      cy.contains('login').click()
      cy.contains('Test U. logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input').first().type('testu')
      cy.get('input').last().type('wrong')
      cy.contains('login').click()
      
      cy.get('.error').should('contain', 'wrong username/password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      
      cy.contains('Test U. logged in').should('not.exist')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'testu', password: 'password'
      }).then(response => {
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })
    })

    it('A blog can be created', function() {
      cy.contains('button', 'create new blog').click()
      cy.get('[data-testid="title"]').type('A new blog')
      cy.get('[data-testid="author"]').type('Cypress')
      cy.get('[data-testid="url"]').type('http://cypress.io')
      cy.get('#create-button').click()
      
      cy.contains('A new blog Cypress')
      cy.contains('a new blog A new blog by Cypress added')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.contains('button', 'create new blog').click()
        cy.get('[data-testid="title"]').type('Another blog')
        cy.get('[data-testid="author"]').type('Cypress')
        cy.get('[data-testid="url"]').type('http://another.io')
        cy.get('#create-button').click()
        cy.contains('Another blog Cypress')
      })

      it('it can be liked', function() {
        cy.contains('Another blog Cypress').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.contains('likes 0')
        cy.get('button').contains('like').click()
        cy.contains('likes 1')
      })

      it('it can be deleted', function() {
        cy.contains('Another blog Cypress').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.contains('delete').click()
        cy.get('html').should('not.contain', 'Another blog Cypress')
      })

      it('only the creator can see the delete button', function() {
         // Logout and login as another user requires backend support for second user or creating one
         // Let's create another user
         const user2 = {
            name: 'Another User',
            username: 'another',
            password: 'password'
         }
         cy.request('POST', 'http://localhost:3003/api/users', user2)
         
         cy.contains('logout').click()
         cy.get('input').first().type('another')
         cy.get('input').last().type('password')
         cy.contains('login').click()
         
         cy.contains('Another blog Cypress').parent().find('button').click()
         cy.should('not.contain', 'delete')
      })
    })

    describe('and multiple blogs exist', function() {
      beforeEach(function() {
        cy.contains('button', 'create new blog').click()
        cy.get('[data-testid="title"]').type('First blog')
        cy.get('[data-testid="author"]').type('Cypress')
        cy.get('[data-testid="url"]').type('http://1.io')
        cy.get('#create-button').click()
        cy.contains('First blog Cypress')

        cy.contains('button', 'create new blog').click()
        cy.get('[data-testid="title"]').type('Second blog')
        cy.get('[data-testid="author"]').type('Cypress')
        cy.get('[data-testid="url"]').type('http://2.io')
        cy.get('#create-button').click()
        cy.contains('Second blog Cypress')
      })

      it('blogs are ordered by likes', function() {
        // Like the second blog
        cy.contains('Second blog Cypress').parent().find('button').click()
        cy.get('button').contains('like').click()
        cy.contains('likes 1')
        cy.contains('hide').click()

        cy.get('.blog').eq(0).should('contain', 'Second blog')
        cy.get('.blog').eq(1).should('contain', 'First blog')
      })
    })
  })
})
