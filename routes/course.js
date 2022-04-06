const express = require('express');
const router = express.Router()


const COURSEDETAILS = require('../models/courseData');




/* multer start */
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
        cb(
            null,
            `${file.fieldname}-${+Date.now()}.${file.originalname.split('.')[1]}`
        );
    }
});

const upload = multer({ storage: storage });


const cpUpload = upload.fields([
    { name: 'image', maxCount: 1 }
]);
/* multer end */


//Course Details Insert
router.post('/addCourse', async (req, res, next) => {

    try {

        var item = {
            title: req.body.title,
            code: req.body.code,
            category: req.body.category,
            image: req.body.image,
            details: req.body.details,
            duration_months: req.body.duration_months,
            duration_internship: req.body.duration_internship,
            mode: req.body.mode,
            fees: req.body.fees,
            brochure: req.body.brochure,
            course_certificate: req.body.course_certificate,
            internship_certificate: req.body.internship_certificate,
            placement_list: req.body.placement_list,
            objectives: req.body.objectives,
            highlights: req.body.highlights,
            test: req.body.test,
            eligibility: req.body.eligibility,
            agenda: req.body.agenda,
            fee_detail: req.body.fee_detail,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            status: req.body.status,
            thumbnail: req.body.thumbnail
        }


        const courseData = new COURSEDETAILS(item)
        const savedIdData = await courseData.save()

        res.send({ savedIdData })


    } catch (error) {

        console.log(error)
    }
})

//Course List Fetch
router.get('/getCourses', async (req, res, next) => {

    try {
        const courseList = await COURSEDETAILS.find()
        res.send(courseList)

    } catch (error) {
        console.log(error)
    }
})


//Course Details Insert
router.post('/updateCourse', async (req, res, next) => {

    try {

        var item = {
            title: req.body.course.title,
            code: req.body.course.code,
            category: req.body.course.category,
            image: req.body.course.image,
            details: req.body.course.details,
            duration_months: req.body.course.duration_months,
            duration_internship: req.body.course.duration_internship,
            mode: req.body.course.mode,
            fees: req.body.course.fees,
            brochure: req.body.course.brochure,
            course_certificate: req.body.course.course_certificate,
            internship_certificate: req.body.course.internship_certificate,
            placement_list: req.body.course.placement_list,
            objectives: req.body.course.objectives,
            highlights: req.body.course.highlights,
            test: req.body.course.test,
            eligibility: req.body.course.eligibility,
            agenda: req.body.course.agenda,
            fee_detail: req.body.course.fee_detail,
            start_date: req.body.course.start_date,
            end_date: req.body.course.end_date,
            status: req.body.course.status,
            thumbnail: req.body.course.thumbnail
        }
        let id = req.body.id
        let updateData = { $set: item };


        // const courseData = new COURSEDETAILS(item)   //!Doesnt Work with update function 
        const savedIdData = await COURSEDETAILS.findByIdAndUpdate({ "_id": id }, updateData)
        res.send({ savedIdData })

    } catch (error) {

        console.log(error)
    }
})


//Delete Course
router.post('/deleteCourse', async (req, res, next) => {

    try {
        let id = req.body.id
        
        const deleteCourse = await COURSEDETAILS.findByIdAndDelete({ '_id': id })
        res.send(deleteCourse)

    } catch (error) {
        console.log(error)
    }
})

//get Course by Id
router.post('/getCourseById', async (req, res, next) => {

    try {

        console.log(req.body.id)
        let _id = req.body.id
        const singleCourse = await COURSEDETAILS.findById({ _id: _id })
        res.send(singleCourse)

    } catch (error) {
        console.log(error)
    }
})



module.exports = router;