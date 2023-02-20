const express = require('express');
const multer = require('multer');
const app = express();
var util = require('util');
var encoder = new util.TextEncoder('utf-8');
const mongoose = require('mongoose');
const User = require('./models/users');
const Factory = require('./models/factories');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cors = require('cors');
var nodemailer = require('nodemailer');

jwtkey = "jwt"; 

app.use(cors());  
mongoose.connect('mongodb+srv://vipin:ldOGGLOXWNcP6OjK@cluster0.y8ufn.mongodb.net/nodedatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.warn("Connected");
    }) 


const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + ".jpg")
        }
    })
}).single("image");

app.post('/register', jsonParser, function (req, res) {
    const salt = bcrypt.genSaltSync(5);
    const defaultPassword = '123456';
    console.log(req.body.role);
    const password = bcrypt.hashSync(defaultPassword, salt);
    const data = new User({
        _id: new mongoose.Types.ObjectId(),
        hashAddress: req.body.whHashAddress,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        password: password,
        role: req.body.role,
    })
    data.save().then((result) => {
        jwt.sign({ result }, jwtkey, { expiresIn: '300s' }, (err, token) => {
            res.status(201).json({ token })
        })
        res.status(201).json(result);
    })
        .catch((err) => console.warn(err)
        )
})

function sendEmail(email,password) {
    var email = email;
    var password = password;
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'akhilsaini87@gmail.com', // Your email id
            pass: 'pzbxmtoaklezhlzv' // Your password
        }
    });

    var mailOptions = {
        from: 'vipinyadav.vy1994@gmail.com',
        to: email,
        subject: 'Congratulation To Supply Chain Management',
        html: '<p>Hello </p> Congratulations on your new venture! It sounds like an exciting opportunity, and I am looking forward to watching your progress as the business develops.</p><p> You can login with these details </p><p>Email : '+ email +' </p><p>Password : '+ password +'</p>'
    };

    mail.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(200).json("Something Went Wrong.");
            //return 1
        } else {
            res.status(200).json("User Added Successfully.");
            // return 0
        }
    });
}

app.post('/addUser', jsonParser, function (req, res) {
    const salt = bcrypt.genSaltSync(5);
    const defaultPassword = '123456';
    const password = bcrypt.hashSync(defaultPassword, salt);
    const data = new User({
        _id: new mongoose.Types.ObjectId(),
        hashAddress: req.body.hashAddress,
        name: req.body.name,
        email: req.body.email,
        password: password,
        role: req.body.role,
        adminId: req.body.adminId,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    })
    data.save().then((result) => {
        jwt.sign({ result }, jwtkey, { expiresIn: '300s' }, (err, token) => {
            res.status(201).json({ token })
        })
        sendEmail(req.body.email, defaultPassword)
        res.status(201).json(result);
    })
        .catch((err) => console.warn(err)
        )
})

app.post('/addMultiUser', jsonParser, function (req, res) {
    const salt = bcrypt.genSaltSync(5);
    const defaultPassword = '123456';
    console.log(req.body);
    const password = bcrypt.hashSync(defaultPassword, salt);
    req.body.forEach(element => {

        const data = new User({
            _id: new mongoose.Types.ObjectId(),
            hashAddress: element[0],
            name: element[1],
            email: element[2],
            password: password,
            role: element[8],
            address: element[3],
            city: element[4],
            country: element[5],
            latitude: element[6],
            longitude: element[7],
        })
        data.save().then((result) => {
            jwt.sign({ result }, jwtkey, { expiresIn: '300s' }, (err, token) => {
                // res.status(201).json({ token })
            })
            // res.status(201).json(result);
        })
            .catch((err) => console.warn(err)
            )

    });


})

app.post('/uploads', upload, function (req, res) {
    res.status(200).json("File Upload");
})

app.post('/factoryLogin', jsonParser, async function (req, res) {
    const userData = await User.findOne({ email: req.body.email, role: 'Factory' });
    if (userData) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(req.body.password, userData.password);
        if (validPassword) {
            jwt.sign({ userData }, jwtkey, { expiresIn: '300s' }, (err, token) => {
                res.status(200).json({ token, userId: userData._id, userHash: userData.hashAddress, userEmail: userData.email, userRole: userData.role, userName: userData.name, address: userData.address, city: userData.city, country: userData.country, latitude: userData.latitude, longitude: userData.longitude })
            })
        } else {
            res.status(400).json({ error: "Invalid Password" });
        }
    } else {
        res.status(401).json({ error: "User does not exist" });
    }
})

app.post('/login', jsonParser, async function (req, res) {
    
    let userEmail = ''
    userEmail = req.body.email;
    
    const userPassword = req.body.password;
    if (userEmail != '' && userPassword != '' && userEmail != undefined && userPassword != undefined) {
        const userData = await User.findOne({ email: req.body.email, role: req.body.role });
        if (userData) {
            // check user password with hashed password stored in the database
            const validPassword = await bcrypt.compare(req.body.password, userData.password);
            if (validPassword) {
                jwt.sign({ userData }, jwtkey, { expiresIn: '300s' }, (err, token) => {
                    //res.status(200).json({ token })
                   // res.status(200).json({ token, userId: userData._id, userEmail: userData.email, userRole: userData.role, userName: userData.name, userAddress: userData.address, userCity: userData.city, userCountry: userData.country, userLatitude: userData.latitude, userLongitude: userData.longitude })

                    res.status(200).json({ token, userId: userData._id})

                })
            } else {
                res.status(400).json({ error: "Invalid Password" });
            }
        } else {
            res.status(401).json({ error: "User does not exist" });
        }
    } else {
        if (userEmail == '' || userEmail == undefined) {
            res.status(401).json({ error: "Email is Required" });
        } else {
            res.status(401).json({ error: "Password is Required" });

        }
    }

})

app.post('/userProfile', jsonParser, async function (req, res) {
    let userId = ''
    userId = req.body.userId;
   
    if (userId != '') {
        const userData = await User.findOne({ userId: userId });
        if (userData) {
            // check user password with hashed password stored in the database
            
                jwt.sign({ userData }, jwtkey, { expiresIn: '300s' }, (err, token) => {
                    //res.status(200).json({ token })
                    res.status(200).json({ token, userId: userData._id, userEmail: userData.email, userRole: userData.role, userName: userData.name, userAddress: userData.address, userCity: userData.city, userCountry: userData.country, userLatitude: userData.latitude, userLongitude: userData.longitude })

                })
           
        } else {
            res.status(401).json({ error: "User does not exist" });
        }
    } else {
        if (userEmail == '' || userEmail == undefined) {
            res.status(401).json({ error: "Email is Required" });
        } else {
            res.status(401).json({ error: "Password is Required" });

        }
    }

})

app.post('/superAdminLogin', jsonParser, async function (req, res) {
    let adminEmail = ''
    adminEmail = req.body.email;
    const adminPassword = req.body.password;
    if (adminEmail != '' && adminPassword != '' && adminEmail != undefined && adminPassword != undefined) {
        const userData = await User.findOne({ email: req.body.email, role: req.body.role, role: 'Superadmin' });
        if (userData) {
            // check user password with hashed password stored in the database
            const validPassword = await bcrypt.compare(req.body.password, userData.password);
            if (validPassword) {
                jwt.sign({ userData }, jwtkey, { expiresIn: '300s' }, (err, token) => {
                    //res.status(200).json({ token })
                    res.status(200).json({ token, userId: userData._id, userEmail: userData.email, userRole: userData.role, userName: userData.name, userAddress: userData.address, userCity: userData.city, userCountry: userData.country, userLatitude: userData.latitude, userLongitude: userData.longitude })

                })
            } else {
                res.status(400).json({ error: "Invalid Password" });
            }
        } else {
            res.status(401).json({ error: "User does not exist" });
        }
    } else {
        if (adminEmail == '' || adminEmail == undefined) {
            res.status(401).json({ error: "Email is Required" });
        } else {
            res.status(401).json({ error: "Password is Required" });

        }
    }

})

app.post('/adminLogin', jsonParser, async function (req, res) {
    let adminEmail = ''
    adminEmail = req.body.email;
    const adminPassword = req.body.password;
    if (adminEmail != '' && adminPassword != '' && adminEmail != undefined && adminPassword != undefined) {
        const userData = await User.findOne({ email: req.body.email, role: req.body.role, role: 'Admin' });
        if (userData) {
            // check user password with hashed password stored in the database
            const validPassword = await bcrypt.compare(req.body.password, userData.password);
            if (validPassword) {
                jwt.sign({ userData }, jwtkey, { expiresIn: '300s' }, (err, token) => {
                    //res.status(200).json({ token })
                    res.status(200).json({ token, userId: userData._id, userEmail: userData.email, userRole: userData.role, userName: userData.name, userAddress: userData.address, userCity: userData.city, userCountry: userData.country, userLatitude: userData.latitude, userLongitude: userData.longitude })

                })
            } else {
                res.status(400).json({ error: "Invalid Password" });
            }
        } else {
            res.status(401).json({ error: "User does not exist" });
        }
    } else {
        if (adminEmail == '' || adminEmail == undefined) {
            res.status(401).json({ error: "Email is Required" });
        } else {
            res.status(401).json({ error: "Password is Required" });

        }
    }

})

app.get('/users', function (req, res) {
    User.find().then((data) => {
        res.status(200).json(data)
    })
})
app.get('/warehouse', function (req, res) {
    User.find({ role: "Warehouse" }).then((data) => {
        res.status(200).json(data)
    })
})
app.get('/company', function (req, res) {
    User.find({ role: "Admin" }).then((data) => {
        res.status(200).json(data)
    })
})
app.post('/factoryByCompany', jsonParser, async function (req, res) {
    let adminId = '';
    adminId = req.body.adminId
    User.find({ role: "Factory", adminId: adminId }).then((data) => {
        res.status(200).json(data)
    })
})

app.post('/userById', jsonParser, async function (req, res) {
    let _id = '';
    _id = req.body._id
    User.find({_id: _id }).then((data)=> {
        const temp = data[0];
       res.status(200).json(temp)
    })
   
})

app.post('/retailerByCompany', jsonParser, async function (req, res) {
    let adminId = '';
    adminId = req.body.adminId
    User.find({ role: "Retailer", adminId: adminId }).then((data) => {
        res.status(200).json(data)
    })
})
app.post('/distributerByCompany', jsonParser, async function (req, res) {
    let adminId = '';
    adminId = req.body.adminId
    User.find({ role: "Distributer", adminId: adminId }).then((data) => {
        res.status(200).json(data)
    })
})
app.post('/retailerList',jsonParser, async function (req, res) {
    
    // User.find({ role: "Retailer"}).then((data) => {
    //     res.status(200).json(data)
    // })
   
    const userData = await  User.find({"role":"Retailer"},{ "_id": 0,"hashAddress": 1, "name": 1 })
    // const userData = await  User.find({ role: "Retailer" });
      
    
    if (userData) {
        jwt.sign({ userData }, jwtkey, { expiresIn: '300s' }, (err, token) => {
            
            res.status(200).json({userData })

        })
        
     } else {
         res.status(401).json({ error: "User does not exist" });
     }
     

});

app.get('/retailer', function (req, res) {
    User.find({ role: "Retailer" }).then((data) => {
        res.status(200).json(data)
    })
});

app.get('/distributer', function (req, res) {
    User.find().where({ role: "Distributer" }).then((data) => {
        res.status(200).json(data)
    })
})
app.get('/productApprover', function (req, res) {
    User.find({ role: "Product Approver" }).then((data) => {
        res.status(200).json(data)
    })
})

app.get('/factory', function (req, res) {
    User.find({ role: "Factory" }).then((data) => {
        res.status(200).json(data)
    })
})

app.get('/customer', function (req, res) {
    User.find().where({ role: "Customer" }).then((data) => {
        res.status(200).json(data)
    })
})

app.get('/rawmaterialsupplier', function (req, res) {
    User.find({ role: "Supplier" }).then((data) => {
        res.status(200).json(data)
    })
})

app.post('/retailerbylocation', jsonParser, function (req, res) {
    User.find({ address: req.body.location, role: req.body.role }).then((data) => {
        res.status(200).json(data[0])
    })
})

app.post('/location', jsonParser, async function (req, res) {
    const locationData = await User.findOne({ hashAddress: req.body.hashAddress });
    if (locationData) {
        var location = locationData.address;
        var username = locationData.name;
        res.status(200).json({ location, username })
    }
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        req.token = bearer[1];
        jwt.verify(req.token, jwtkey, (err, authData) => {
            if (err) {
                res.json({ result: err })
            } else {
                next();
            }
        })
    } else {
        res.json({ "result": "Token not Provided" })
    }
}
app.listen(5155);