<!-- <template>
    <div v-if="knight">
      <h1>{{ knight.name }}</h1>
      <p>Nickname: <input v-model="knight.nickname" /></p>
      <button @click="updateNickname">Update Nickname</button>
      <button @click="removeKnight">Remove Knight</button>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  import { defineComponent } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  export default defineComponent({
    data() {
      return {
        knight: null as { id: number; name: string; nickname: string } | null,
      };
    },
    async created() {
      const route = useRoute();
      const { data } = await axios.get(`api/knights/${route.params.id}`);
      this.knight = data;
    },
    methods: {
      async updateNickname() {
        if (this.knight) {
          await axios.put(`api/knights/${this.knight.id}`, {
            nickname: this.knight.nickname,
          });
          alert('Nickname updated!');
        }
      },
      async removeKnight() {
        const router = useRouter();
        if (this.knight) {
          await axios.delete(`api/knights/${this.knight.id}`);
          alert('Knight removed!');
          router.push('/');
        }
      },
    },
  });
  </script>
   -->



   <template>
    <div v-if="knight">
      <h1>Detalhes de {{ knight.name }}</h1>
  
      <p><strong>Nome:</strong> {{ knight.name }}</p>
      <p>
        <strong>Apelido: </strong>
        <input v-model="knight.nickname" />
        <button @click="updateNickname">Atualizar Apelido</button>
      </p>
  
      <p><strong>Armas:</strong></p>
      <ul>
        <li v-for="weapon in knight.weapons" :key="weapon._id">
          {{ weapon.name }} ({{ weapon.attr }}: +{{ weapon.mod }})
          <span v-if="weapon.equipped">[Equipped]</span>
        </li>
      </ul>
  
      <button @click="deleteKnight">Enviar para o Hall of Heroes</button>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  import { defineComponent } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  export default defineComponent({
    setup() {
        const route = useRoute();
        const router = useRouter();

        return { route, router }; // Disponibilizamos `route` e `router`
    },
    data() {
      return {
        knight: null as {
          _id: string;
          name: string;
          nickname: string;
          weapons: Array<{
            _id: string;
            name: string;
            mod: number;
            attr: string;
            equipped: boolean;
          }>;
        } | null,
      };
    },
    async created() {
      const route = useRoute();
      try {
        const { data } = await axios.get(`/api/knights/${route.params.id}`);
        this.knight = data;
      } catch (error) {
        console.error('Erro ao buscar knight:', error);
      }
    },
    methods: {
      async updateNickname() {
        if (this.knight) {
          try {
            await axios.put(`/api/knights/${this.knight._id}`, {
              nickname: this.knight.nickname,
            });
            alert('Apelido atualizado com sucesso.');
          } catch (error) {
            console.error('Erro ao atualizar nickname:', error);
            alert('Erro ao atualizar apelido.');
          }
        }
      },
      async deleteKnight() {
        // const router = useRouter();
        if (this.knight) {
          try {
            await axios.delete(`/api/knights/${this.knight._id}`);
            // alert('Knight deletado com sucesso!');
            alert('Knight enviado paro o Hall of Heroes!');
            // router.push('/'); // Redireciona para a lista de knights
            this.router.push('/heroes');
          } catch (error) {
            console.error('Erro ao deletar knight:', error);
            alert('Erro ao deletar knight.');
          }
        }
      },
    },
  });
  </script>
  
  <style scoped>
  button {
    margin-top: 10px;
  }
  </style>
  