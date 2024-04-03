import UserDatabase from "./Database/UserDatabase";
import md5 from "md5";

const dbcl = new UserDatabase();

const userSchema = dbcl.createUserObject(
	"SoulSnatcher",
	"soulsnattcherr@gmail.com",
	102,
	101,
	md5("p4$$w0rD"),
);

console.log(dbcl.getUser(userSchema));
