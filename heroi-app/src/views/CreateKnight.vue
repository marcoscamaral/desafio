<template>
  <div>
    <h1>Cadastrar Knight</h1>
    <form @submit.prevent="createKnight">
      <div>
        <label>Nome:</label>
        <input v-model="form.name" required />
      </div>

      <div>
        <label>Apelido:</label>
        <input v-model="form.nickname" required />
      </div>

      <div>
        <label>Data de Nascimento:</label>
        <input type="date" v-model="form.birthday" required />
      </div>

      <div>
        <label>Atributo Principal:</label>
        <select v-model="form.keyAttribute" required>
          <option v-for="attr in attributes" :key="attr" :value="attr">
            {{ attr }}
          </option>
        </select>
      </div>

      <fieldset>
        <legend>Atributos</legend>
        <div v-for="(value, key) in form.attributes" :key="key">
          <label>{{ key }}:</label>
          <input type="number" v-model.number="form.attributes[key]" min="0" max="10" />
        </div>
      </fieldset>

      <fieldset>
        <legend>Armas</legend>
        <div v-for="(weapon, index) in form.weapons" :key="index">
          <div>
            <input
              v-model="weapon.name"
              placeholder="Nome da arma"
              required
            />
          </div>
          <div>
              <!-- <input
                v-model="weapon.attr"
                placeholder="Atributo"
                required
              /> -->
              <label>
                Atributo
                <select v-model="weapon.attr" required>
                  <option v-for="attr in attributes" :key="attr" :value="attr">
                    {{ attr }}
                  </option>
                </select>
              </label>
              <input
                type="number"
                v-model.number="weapon.mod"
                placeholder="Modificador"
                min="0"
                max="10"
                required
              />
          </div>
          <div>
            <label>
              <input type="checkbox" v-model="weapon.equipped" />
              Equipado
            </label>
          </div>
          <div>
            <button type="button" @click="removeWeapon(index)">Remover</button>
          </div>
          <br />
        </div>
        <button type="button" @click="addWeapon">Adicionar Arma</button>
      </fieldset>

      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  data() {
    return {
      form: {
        name: '',
        nickname: '',
        birthday: '',
        keyAttribute: 'strength',
        attributes: {
          strength: 0,
          dexterity: 0,
          constitution: 0,
          intelligence: 0,
          wisdom: 0,
          charisma: 0,
        },
        weapons: [] as Array<{
          name: string;
          mod: number;
          attr: string;
          equipped: boolean;
        }>,
      },
      attributes: [
        'strength',
        'dexterity',
        'constitution',
        'intelligence',
        'wisdom',
        'charisma',
      ],
    };
  },
  methods: {
    async createKnight() {
      try {
        const { data } = await axios.post('api/knights', this.form);
        alert('Knight cadastrado com sucesso!');
        this.$router.push('/'); // Redireciona para a página inicial
      } catch (error) {
        console.error('Erro ao cadastrar knight:', error);
        alert('Erro ao cadastrar knight.');
      }
    },
    addWeapon() {
      this.form.weapons.push({ name: '', mod: 0, attr: '', equipped: false });
    },
    removeWeapon(index: number) {
      this.form.weapons.splice(index, 1);
    },
  },
});
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
}

fieldset {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
}

button {
  align-self: flex-start;
}
</style>
