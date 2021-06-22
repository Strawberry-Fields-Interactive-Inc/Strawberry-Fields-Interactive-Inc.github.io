
class Validations{
    public isEmail(email:string): boolean {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    public isName(name:string): boolean {
        
        return name.trim().length >= 2;
    }

    public containsIntersection(a:string,b:string):boolean
    {
        let has: boolean = false;
        for (let index:number = 0 ; !has && index< a.length ; index++ )
        {
            has = b.indexOf( a.charAt(index)) >=0;
        }  
       return has;
    }   
    
    public isValidCharacters(acceptedChars:string,testChars:string):boolean
    {
        let has: boolean = true;
        for (let index:number = 0 ; has && index< testChars.length ; index++ )
        {
            has = acceptedChars.indexOf( testChars.charAt(index)) >=0;
        }      
       return has;
    }

    public getSimbolsChars():string
    {
        return ".@!*#$";
    }

    public getUpperCaseChars():string
    {
        return  "ABCDEFGHIJKLMNOPQRSTUVXWY";
    }

    public getLowerCaseChars():string
    {
        return  "ABCDEFGHIJKLMNOPQRSTUVXWY".toLowerCase();
    }

    public getNumbersChars():string
    {
        return  "0123456789";
    }

    public getMinimumPasswordSize():number
    {
        return 5;
    }


    public isPassword(password:string): boolean {
        const upperChars:string = this.getUpperCaseChars();
        const lowerChars:string =  this.getLowerCaseChars();
        const numbers:string = this.getNumbersChars();
        const simbols:string = this.getSimbolsChars();
        const validCharacters:string = upperChars+numbers+simbols+lowerChars;
        
        if(password.trim().length < this.getMinimumPasswordSize())
        {
            return false;
        }

        if(!this.containsIntersection(password,upperChars))
        {
            return false;
        }

        if(!this.containsIntersection(password,numbers))
        {
            return false;
        }

        if(!this.containsIntersection(password,simbols))
        {
            return false;
        }

        if(!this.isValidCharacters(validCharacters,password))
        {
            return false;
        }

        return true;
    }
}

const validations = new Validations();

export default validations;