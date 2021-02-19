<template>
    <div class="relative">
        <Nav></Nav>
        <Generico :titulo="'CONCENTRADO DTC'" :tipo="'CAL'"></Generico>
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
