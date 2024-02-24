const z = require('zod')

const movieSquema = z.object(
    {
        titulo : z.string({
            invalid_type_error: ' movie title  must be a string and cannot be empty.',
            too_short_error: ' movie title  must be at least 3 characters long.',
        }),
        anio   : z.number().int().positive(),
        director:z.string(),
        genero : z.string({ 
            require_error:'movie genre is require',
            invalid_type_error: "The type of the value provided for movie genre is not valid."
       } )
    })

    function validaciones(object){
        return movieSquema.safeParse(object)

    }
    
    function validParcialMovie (input){
        return movieSquema.partial().safeParse(input)
    }
    module.exports = {
        validaciones,
        validParcialMovie
    }