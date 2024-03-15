import Container from "@/components/ui/container";
import Link from "next/link";

const Navbar = () => {
    return ( 
        <div className="border-b">
                <Container>
                    <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                        <Link href="/" className="ml-2 flex-lg: ml-0 gap-x-1">
                            <p className="font-bold text-xl">InstaPay</p>
                        </Link>
                    </div>
                </Container> 
        </div>
    );
}
 
export default Navbar; 