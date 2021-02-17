<template>
    <div class="relative">
        <Nav></Nav>
        <Generico :titulo="'CONCENTRADO DTC'" :tipo="'DTC'"></Generico>
    </div>
</template>

<script>
import Generico from "../../components/Header/HeaderGenerico";
import Nav from "../../components/Navbar";

export default {
    name: "HeaderGenerico",
    components: {
    Generico,
    Nav
    }
}
</script>