const router = require('express').Router();
const Movie = require('../models/Movie');
const multer = require('multer');
const verifyToken = require('../verifyToken'); // <-- 1. استيراد أداة التحقق

// --- إعداد Multer لرفع الملفات (كما هو) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'poster') {
            cb(null, 'uploads/posters/');
        } else if (file.fieldname === 'movie_file') {
            cb(null, 'uploads/movies/');
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });


// --- 2. تعديل مسار إضافة الفيلم (أصبح آمناً ويحفظ كل شيء) ---
router.post('/add', 
    verifyToken, // <-- أولاً: تحقق من أن المستخدم مسجل دخوله
    upload.fields([{ name: 'poster', maxCount: 1 }, { name: 'movie_file', maxCount: 1 }]), 
    async (req, res) => {
    
    // --- ثانياً: تحقق من أنه "إداري" ---
    if (!req.user.isAdmin) {
        return res.status(403).json('أنت غير مصرح لك بإضافة أفلام!');
    }
    console.log('البيانات المستلمة في الخادم:', req.body);
    // ---------------------------------

    try {
        const newMovie = new Movie({
            title: req.body.title,
            description: req.body.description,
            posterPath: req.files.poster[0].path,
            moviePath: req.files.movie_file[0].path,
            genre: req.body.genre.split(','),
            country: req.body.country,
            year: req.body.year,
            
            // --- 3. هذا هو الإصلاح (إضافة الحقول الجديدة) ---
            rating: req.body.rating,
            classification: req.body.classification
            // -------------------------------------------
        });

        const movie = await newMovie.save();
        res.status(201).json(movie);
    } catch (err) {
        console.error(err); // طباعة الخطأ في الطرفية
        res.status(500).json(err);
    }
});

// --- مسار لجلب كل الأفلام (كما هو) ---
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find().sort({ createdAt: -1 });
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json(err);
    }
});

// --- مسار لجلب فيلم واحد (كما هو) ---
router.get('/find/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;