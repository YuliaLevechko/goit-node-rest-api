import { Schema, model } from ("mongoose");
import handleMongooseError from "../middlewares/handleMongooseError";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
       validate: {
            validator: function (value) {
                return typeof value === 'boolean';
            },
            message:'Favourite must be a boolean value'
        }
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

export default Contact;