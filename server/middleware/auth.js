import jwt from 'jsonwebtoken'

const auth = async(request,response,next)=>{
    try {
        const cookiesToken = request?.cookies?.accessToken
        const headerToken = request?.headers?.authorization?.startsWith('Bearer ')
            ? request.headers.authorization.split(' ')[1]
            : null
        const token = cookiesToken || headerToken

        if(!token){
            return response.status(401).json({
                message : "Provide token",
                error : true,
                success : false
            })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN)

        if(!decode){
            return response.status(401).json({
                message : "unauthorized access",
                error : true,
                success : false
            })
        }

        request.userId = decode.id

        next()

    } catch (error) {
        return response.status(401).json({
            message : "You have not login",
            error : true,
            success : false
        })
    }
}

export default auth