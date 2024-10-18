<!-- <template>
    <div>
      <h1>Knights</h1>
  
      <div v-if="loading">Loading knights...</div>
      <div v-else-if="error">Failed to load knights: {{ error }}</div>
  
      <ul v-else>
        <li v-for="knight in knights" :key="knight._id">
          <h2>{{ knight.name }} ({{ knight.nickname }})</h2>
          <p>Birthday: {{ formatDate(knight.birthday) }}</p>
          <p><strong>Main Attribute:</strong> {{ knight.keyAttribute }}</p>
  
          <h3>Attributes:</h3>
          <ul>
            <li v-for="(value, key) in knight.attributes" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
  
          <h3>Weapons:</h3>
          <ul>
            <li v-for="weapon in knight.weapons" :key="weapon._id">
              <strong>{{ weapon.name }}</strong> 
              ({{ weapon.attr }}: +{{ weapon.mod }})
              <span v-if="weapon.equipped">[Equipped]</span>
            </li>
          </ul>
  
          <router-link :to="`/knights/${knight._id}`">View Details</router-link>
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
        knights: [] as Array<{
          _id: string;
          name: string;
          nickname: string;
          birthday: string;
          keyAttribute: string;
          attributes: Record<string, number>;
          weapons: Array<{
            _id: string;
            name: string;
            mod: number;
            attr: string;
            equipped: boolean;
          }>;
        }>,
        loading: true,
        error: '' as string | null,
      };
    },
    async created() {
      try {
        const { data } = await axios.get('api/knights');
        this.knights = data;
      } catch (err: any) {
        this.error = err.message || 'An unexpected error occurred';
      } finally {
        this.loading = false;
      }
    },
    methods: {
      formatDate(dateStr: string) {
        const date = new Date(dateStr);
        return date.toLocaleDateString();
      },
    },
  });
  </script>
  
  <style scoped>
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 20px;
  }
  
  h2 {
    margin: 0;
  }
  </style>
   -->

   <template>
    <div>
      <h1>Knights</h1>
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
            <td><router-link :to="`/knights/${knight._id}`">{{ knight.name }} ({{ knight.nickname }})</router-link></td>
            <td><router-link :to="`/knights/${knight._id}`">{{ calculateAge(knight.birthday) }}</router-link></td>
            <td><router-link :to="`/knights/${knight._id}`">{{ knight.weapons.length }}</router-link></td>
            <td><router-link :to="`/knights/${knight._id}`">{{ knight.keyAttribute }}</router-link></td>
            <td><router-link :to="`/knights/${knight._id}`">{{ calculateAttack(knight) }}</router-link></td>
            <td><router-link :to="`/knights/${knight._id}`">{{ calculateExperience(knight.birthday) }}</router-link></td>
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
        const { data } = await axios.get('api/knights');
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
  