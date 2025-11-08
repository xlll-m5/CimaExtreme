const router = require('express').Router();
const User = require('../models/User');
const verifyToken = require('../verifyToken'); // استيراد الوسيط

// --- إضافة/إزالة من المفضلة ---
// (محمي بواسطة "verifyToken")
router.post('/favorites/:movieId', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // جلب المستخدم من التوكن
        const movieId = req.params.movieId;

        // التحقق إذا كان الفيلم موجوداً مسبقاً
        if (user.favorites.includes(movieId)) {
            // إذا موجود، احذفه (pull)
            await user.updateOne({ $pull: { favorites: movieId } });
            res.status(200).json({ message: 'تم الحذف من المفضلة', added: false });
        } else {
            // إذا غير موجود، أضفه (push)
            await user.updateOne({ $push: { favorites: movieId } });
            res.status(200).json({ message: 'تمت الإضافة للمفضلة', added: true });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// --- إضافة/إزالة من المشاهدة لاحقاً ---
router.post('/watch-later/:movieId', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const movieId = req.params.movieId;

        if (user.watchLater.includes(movieId)) {
            await user.updateOne({ $pull: { watchLater: movieId } });
            res.status(200).json({ message: 'تم الحذف من قائمة المشاهدة', added: false });
        } else {
            await user.updateOne({ $push: { watchLater: movieId } });
            res.status(200).json({ message: 'تمت الإضافة للمشاهدة لاحقاً', added: true });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;