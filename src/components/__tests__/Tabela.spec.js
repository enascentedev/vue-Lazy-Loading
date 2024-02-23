import { describe, it, expect, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import Tabela from '../Tabela.vue'
import { rest } from 'msw'
import { setupServer } from 'msw/node'


// Configuração do mock da API
const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
    return res(ctx.json({ dados: 'resposta simulada' }), ctx.delay(150)) // Atraso simulado de 150ms
  })
)

beforeAll(() => server.listen())
afterAll(() => server.close())

describe('Tabela', () => {
  it('verifica o tempo de resposta da request', async () => {
    const startTime = performance.now()
    const wrapper = mount(Tabela) // Assumindo que o componente faz a request ao ser montado

    await wrapper.vm.$nextTick() // Espera o DOM ser atualizado
    const endTime = performance.now()
    const requestTime = endTime - startTime

    // Verifique se o tempo de resposta está dentro de um limite aceitável, por exemplo, menos de 200ms
    expect(requestTime).toBeLessThan(200)
  })

  it('verifica o tempo de resposta da pesquisa', async () => {
    const wrapper = mount(Tabela)
    // Simule a ação de pesquisa, por exemplo, atualizando a propriedade de pesquisa ou emitindo um evento
    const startTime = performance.now()
    
    // Supondo que você tenha uma função de pesquisa ou um método para atualizar a tabela
    await wrapper.vm.pesquisar('termo de pesquisa')

    await wrapper.vm.$nextTick() // Espera o componente reagir à pesquisa
    const endTime = performance.now()
    const searchTime = endTime - startTime

    expect(searchTime).toBeLessThan(100) // Verifique se a pesquisa foi rápida, por exemplo, menos de 100ms
  })
})
