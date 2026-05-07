<script>
    function maskCEP(input) {
      let value = input.value.replace(/\D/g, "");
      if (value.length > 5) value = value.slice(0, 5) + "-" + value.slice(5, 8);

      input.value = value;

      if (value.replace(/\D/g, "").length === 8) buscarCEP(value);
    }

    async function buscarCEP(cep) {
      let cepTratado = cep.replace(/\D/g, "");

      try {
        const resp = await fetch(
          `https://viacep.com.br/ws/${cepTratado}/json/`,
        );
        const data = await resp.json();

        if (data.erro) {
          console.log("CEP não encontrado!");
          return;
        }

        document.getElementById("logradouro").value = data.logradouro || "";
        document.getElementById("bairro").value = data.bairro || "";
        document.getElementById("localidade").value = data.localidade || "";
        document.getElementById("uf").value = data.uf || "";

        document.getElementById("numero").focus();
      } catch (error) {
        console.log("Erro ao buscar CEP", error);
      }
    }
  </script>