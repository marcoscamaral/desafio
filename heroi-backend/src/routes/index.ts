import { Router, Request, Response } from 'express';

// import knights, { Knight } from '../data/knightsData';;
import { Knight } from '../models/knight-model';
import { HallOfHeroes } from '../models/hall-of-heroes-model';


// const router = Router();
const router: Router = Router();


router.get('/test', async (req: Request, res: Response): Promise<any> => {
  try {
    const knight = new Knight();

    knight.name = "Atthur";
    knight.nickname = "The King";
    knight.birthday = "500-01-01";
    knight.weapons.push({
      name: "Excalibur",
      mod: 5,
      attr: "strength",
      equipped: true,
    });
    knight.attributes = {
      strength: 10,
      dexterity: 5,
      constitution: 8,
      intelligence: 7,
      wisdom: 6,
      charisma: 9
    };
    knight.keyAttribute = "strength";

    const savedKnight = await knight.save();
    res.status(201).json(savedKnight);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar cavaleiro', error });
  } 
});

router.get('/test2', async (req: Request, res: Response): Promise<any> => {
  try {
    const knight = new Knight();

    knight.name = "Lancelot";
    knight.nickname = "Cavaleiro Branco";
    knight.birthday = "1982-11-04";
    knight.weapons.push({
      name: "Joyeuse",
      mod: 3,
      attr: "strength",
      equipped: true,
    });
    knight.attributes = {
      strength: 9,
      dexterity: 6,
      constitution: 8,
      intelligence: 7,
      wisdom: 7,
      charisma: 10
    };
    knight.keyAttribute = "strength";

    const savedKnight = await knight.save();
    res.status(201).json(savedKnight);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar cavaleiro', error });
  } 
});

// [GET] /knights - Listar todos os cavaleiros
router.get('/', async (req: Request, res: Response) => {
  try {
    const { filter } = req.query;
    let knights;

    if (filter === 'heroes') {
      knights = await Knight.find({ isHero: true });
    } else {
      // knights = await Knight.find();
      knights = await Knight.find({ isHero: false });
    }

    res.status(200).json(knights);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar cavaleiros', error });
  }
});


// [POST] /knights - Adicionar um novo cavaleiro
// router.post('/', async (req: Request, res: Response) => {
//   try {
//     const knight = new Knight(req.body);
//     const savedKnight = await knight.save();
//     res.status(201).json(savedKnight);
//   } catch (error) {
//     res.status(400).json({ message: 'Erro ao criar cavaleiro', error });
//   } 
// });
router.post('/', async (req: Request, res: Response) => {
  try {
    const knight = new Knight(req.body);
    const savedKnight = await knight.save();
    res.status(201).json(savedKnight);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar cavaleiro', error });
  }
});

// [GET] /knights/:id - Obter cavaleiro pelo ID
router.get('/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const knight = await Knight.findById(req.params.id);
    if (!knight) {
      return res.status(404).json({ message: 'Cavaleiro não encontrado' });
    }
    res.status(200).json(knight);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cavaleiro', error });
  }
});

// [DELETE] /knights/:id - Remover cavaleiro pelo ID
router.delete('/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    // const knight = await Knight.findByIdAndDelete(req.params.id);
    const knight = await Knight.findByIdAndUpdate(
      req.params.id,
      { isHero: true },
      { new: true }
    );
    if (!knight) {
      return res.status(404).json({ message: 'Cavaleiro não encontrado' });
    }

    const hero = new HallOfHeroes({
      knightId: knight._id,
      name: knight.name,
      nickname: knight.nickname,
    });
    await hero.save();

    res.status(200).json({ message: 'Cavaleiro movido para o Hall of Heroes', hero });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover cavaleiro', error });
  }
});


// [PUT] /knights/:id - Atualizar informações de um cavaleiro
router.put('/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const { nickname } = req.body;
    const updatedKnight = await Knight.findByIdAndUpdate(
      req.params.id,
      { nickname },
      { new: true }
    );

    if (!updatedKnight) {
      return res.status(404).json({ message: 'Cavaleiro não encontrado' });
    }

    res.status(200).json(updatedKnight);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar apelido', error });
  }
});

export default router;
