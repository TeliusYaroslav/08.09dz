import { Request, Response } from 'express' 
import { UserService } from './userService' 

const userService = new UserService() 

function loginUser(req: Request, res: Response) {

    res.render('login') 
}

function registrationUser(req: Request, res: Response) {

    res.render('registration') 
}

async function authUser(req: Request, res: Response) {
    const { email, password } = req.body 
    

    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' }) 
        return 
    }

    try {
        const user = await userService.getUserByEmail(email) 
        
        if (user && user.password === password) {

            res.cookie('user', JSON.stringify({ email: user.email, role: user.role }), { httpOnly: true }) 

            res.locals.user = { email: user.email, role: user.role } 

            res.status(200).json({ email: user.email, role: user.role }) 
            return 
        }

        res.status(401).json({ message: 'Unauthorized' }) 
    } catch (error) {
        console.error('Ошибка при авторизации:', error) 
        res.status(500).json({ message: 'Internal Server Error' }) 
    }
}

async function authRegistration(req: Request, res: Response) {
    const { username, email, password } = req.body 
    
    if (!username || !email || !password) {
        res.status(400).json({ message: 'Username, email, and password are required' }) 
        return 
    }

    try {
        const existingUser = await userService.getUserByEmail(email) 
        if (existingUser) {
            res.status(400).json({ message: 'User exists' }) 
            return 
        }

        const newUser = await userService.registerUser({ username, email, password }) 

        res.cookie('user', JSON.stringify({ email: newUser.email, role: newUser.role }), { httpOnly: true }) 

        res.locals.user = { email: newUser.email, role: newUser.role } 


        res.status(201).json({ email: newUser.email, role: newUser.role }) 
    } catch (error) {
        console.error('Ошибка при регистрации:', error) 
        res.status(500).json({ message: 'Internal Server Error' }) 
    }
}

export { loginUser, registrationUser, authUser, authRegistration } 











// import { Request, Response } from 'express' 
// import { UserService } from './userService' 

// const userService = new UserService() 

// function loginUser(req: Request, res: Response) {
//     res.render('login') 
// }

// function registrationUser(req: Request, res: Response) {
//     res.render('registration') 
// }

// async function authUser(req: Request, res: Response) {
//     const { email, password } = req.body 

//     if (!email || !password) {
//         res.status(400).json({ message: 'Email and password are required' }) 
//         return 
//     }

//     const user = await userService.getUserByEmail(email) 

//     if (user && user.password === password) {
//         res.cookie('user', JSON.stringify({ email: user.email, role: user.role }), { httpOnly: true }) 
//         res.locals.user = { email: user.email, role: user.role } 
//         res.status(200).json({ email: user.email, role: user.role }) 
//     } else {
//         res.status(401).json({ message: 'Unauthorized' }) 
//     }
// }

// async function authRegistration(req: Request, res: Response) {
//     const { username, email, password } = req.body 

//     if (!username || !email || !password) {
//         res.status(400).json({ message: 'Username, email, and password are required' }) 
//         return 
//     }

//     const existingUser = await userService.getUserByEmail(email) 
//     if (existingUser) {
//         res.status(400).json({ message: 'User exists' }) 
//         return 
//     }

//     const newUser = await userService.registerUser({ username, email, password }) 

//     res.cookie('user', JSON.stringify({ email: newUser.email, role: newUser.role }), { httpOnly: true }) 
//     res.locals.user = { email: newUser.email, role: newUser.role } 
//     res.status(201).json({ email: newUser.email, role: newUser.role }) 
// }


// function getProfile(req: Request, res: Response) {
//     const user = (req as any).user
//     res.send(`Welcome to your profile, ${user.email}!`) 
// }


// function getAdmin(req: Request, res: Response) {
//     res.send('Welcome, Admin!') 
// }

// export {
//     loginUser,
//     registrationUser,
//     authUser,
//     authRegistration,
//     getProfile,
//     getAdmin,
// } 





