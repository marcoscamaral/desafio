<!-- <template>
    <div>
      <h1>Heroes</h1>
      <ul>
        <li v-for="hero in heroes" :key="hero.id">
          <router-link :to="`/knights/${hero.id}`">{{ hero.name }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        heroes: [] as Array<{ id: number; name: string }>,
      };
    },
    async created() {
      const { data } = await axios.get('http://localhost:5001/knights?filter=heroes');
      this.heroes = data;
    },
  });
  </script>
   -->

   <template>
    <div>
      <h1>Hall of Heroes</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Armas</th>
            <th>Atributo</th>
            <th>Ataque</th>
            <th>Exp</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="knight in knights" :key="knight._id">
            <td>{{ knight.name }} ({{ knight.nickname }})</td>
            <td>{{ calculateAge(knight.birthday) }}</td>
            <td>{{ knight.weapons.length }}</td>
            <td>{{ knight.keyAttribute }}</td>
            <td>{{ calculateAttack(knight) }}</td>
            <td>{{ calculateExperience(knight.birthday) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        knights: [] as Array<{
          _id: string;
          name: string;
          birthday: string;
          keyAttribute: string;
          weapons: Array<{
            _id: string;
            name: string;
            mod: number;
            attr: string;
            equipped: boolean;
          }>;
          attributes: Record<string, number>;
        }>,
      };
    },
    async created() {
      try {
        const { data } = await axios.get('api/knights?filter=heroes');
        this.knights = data;
      } catch (error) {
        console.error('Failed to fetch knights:', error);
      }
    },
    methods: {
      calculateAge(birthday: string): number {
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      },
      calculateAttack(knight: any): number {
        const keyAttrMod = knight.attributes[knight.keyAttribute] || 0;
        const equippedWeapon = knight.weapons.find((w) => w.equipped);
        const weaponMod = equippedWeapon ? equippedWeapon.mod : 0;
        return 10 + keyAttrMod + weaponMod;
      },
      calculateExperience(birthday: string): number {
        const age = this.calculateAge(birthday);
        if (age < 7) return 0;
        return Math.floor((age - 7) * Math.pow(22, 1.45));
      },
    },
  });
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  thead {
    background-color: #f4f4f4;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  tr:hover {
    background-color: #f1f1f1;
  }
  
  th {
    padding-top: 12px;
    padding-bottom: 12px;
    background-color: #ccd3cd;
    color: rgb(34, 31, 31);
  }
  </style>