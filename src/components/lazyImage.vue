<template>
  <div class="min-h-screen flex flex-col">
    <h1 class="text-4xl font-bold mt-4 mb-2">Título da Página</h1>
    <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

    <!-- Adicione várias seções de conteúdo para forçar a rolagem -->
    <div class="mb-4 p-4 bg-gray-200 rounded-lg shadow-md" v-for="n in 20" :key="n">
      <h2 class="font-bold text-2xl">Seção {{ n }}</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
    </div>
    
    <!-- Espaço extra para garantir que a imagem esteja fora do viewport -->
    <div class="h-96"></div>

    <!-- Imagem no final da página para testar o lazy loading -->
    <img
      v-lazy="imageLazy"
      alt="Descrição da imagem"
      class="w-full"
    />
  </div>
	
</template>

<script>
export default {
  data() {
    return {
      imageLazy: 'https://www.shutterstock.com/image-illustration/abstract-wave-technology-background-blue-260nw-2152448863.jpg',
    }
  }
}
</script>
