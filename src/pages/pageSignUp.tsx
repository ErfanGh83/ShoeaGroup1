import SignUpForm from "../components/signUpForm"


export default function PageSignUp(){
    return (
        <div>
            <button className="m-4">
                <img className="w-8 h-8 scale-x-[-1] m-auto" src="/src/assets/right-arrow-icon.png"/>
            </button>
            <SignUpForm/>
        </div>
    )
}