# clone puxando submodules

**git clone https://github.com/ErickWendel/semana-javascript-expert04 --recurse-submodules**

o --resurse-submodules nos permite puxar o template html do projeto, que foi criado como um submodule, sem a flag, a initial-template pasta vem vazia

======================================================================================

**Browsers como safri não possuem o MediaRecorder, por isso foi acrescentado um polyfill**

  <script>
    if (!window.MediaRecorder || !window.navigator.getUserMedia) {
      document.write(
        decodeURI('%3Cscript defer src="./../../deps/polyfill.js">%3C/script>')
      )
    }
  </script>

======================================================================================

# GlobalThis -> Utilisando variáveis de CDN dentro do nosso código:

em pages/login temos esses scripts aqui, que na real são dependências que importamos via CDN:
saca a dependência do socketIo , no segundo script...

  <!-- Scripts -->
  <script src="https://use.fontawesome.com/8604f653a5.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.1/socket.io.min.js" integrity="sha512-eVL5Lb9al9FzgR63gDs1MxcDS2wFu3loYAgjIH0+Hg38tCS8Ag62dwKyH+wzDb+QauDpEZjXbMn11blw8cbTJQ==" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/peerjs/1.3.2/peerjs.min.js" integrity="sha512-4wTQ8feow93K3qVGVXUGLULDB9eAULiG+xdbaQH8tYZlXxYv9ij+evblXD0EOqmGWT8NBTd1vQGsURvrQzmKeg==" crossorigin="anonymous"></script>

Para utilizar informações dessa CDN dentro do nosso código, usamos o **globalThis**

globalThis.io.connect()

=======================================================================================

Se liga que o import com o ecmascript modules, é importante colocar a extensão do arquivo

import { constants } from './constants.js';

=======================================================================================

# =======================================================================================

# =======================================================================================

# =======================================================================================

# =======================================================================================

# =======================================================================================

# =======================================================================================

# =======================================================================================

# =======================================================================================

# =======================================================================================

=======================================================================================
