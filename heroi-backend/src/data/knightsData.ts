type Knight = {
    id: number;
    name: string;
    isHero: boolean;
    description: string;
  };
  
  const knights: Knight[] = [
    { id: 1, name: 'Lancelot', isHero: true, description: 'Cavaleiro da Távola Redonda.' },
    { id: 2, name: 'Mordred', isHero: false, description: 'Inimigo do Rei Arthur.' },
  ];
  
  export default knights;
  export type { Knight };
  