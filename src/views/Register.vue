<template>
  <div>
    <div class="flex flex-col sm:m-6 mt-16 max-w-md mx-auto border shadow-xl">
      <div class="text-4xl text-center text-gray-900 mt-4">
        <h1>Crear Usuario</h1>
      </div>
      <div class="inline-flex justify-center mt-6">
        <div class="m-3">
          <p for="nombre" class="text-sm text-gray-800 mb-1">Nombre</p>
          <input type="text" class="w-64" name="nombre" />
        </div>
      </div>
      <div class="inline-flex justify-center">
        <div class="m-3">
          <p for="nombre" class="text-sm text-gray-800 mb-1">Apellido Materno</p>
          <input type="text" class="w-64" name="nombre" />
        </div>
      </div>
      <div class="inline-flex justify-center">
        <div class="m-3">
          <p for="nombre" class="text-sm text-gray-800 mb-1">Apellido Paterno</p>
          <input type="text" class="w-64" name="nombre" />
        </div>
      </div>
      <div class="inline-flex justify-center">
        <div class="m-3">
          <p for="nombre" class="text-sm text-gray-800 mb-1">Contraseña</p>
          <input type="text" class="w-64" name="nombre" />
        </div>
      </div>
      <div class="inline-flex justify-center">
        <div class="m-5">
          <p for="nombre" class="text-sm text-gray-800 mb-1">Repite Contraseña</p>
          <input type="text" class="w-64" name="nombre" />
        </div>
      </div>
      <div class="inline-flex justify-center mb-5">
        <div class="m-5">
            <button class=" border-green-600 border w-64 h-12">
                Registrar
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
};
</script>

