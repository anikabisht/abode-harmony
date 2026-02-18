import { motion } from "framer-motion";
import { UtensilsCrossed } from "lucide-react";

const weekMenu = [
  { day: "Monday", breakfast: "Poha, Toast, Tea", lunch: "Dal, Rice, Roti, Mix Veg", snack: "Samosa, Chai", dinner: "Paneer Butter Masala, Rice, Roti" },
  { day: "Tuesday", breakfast: "Idli, Sambhar, Coffee", lunch: "Rajma, Rice, Roti, Salad", snack: "Bread Pakoda, Tea", dinner: "Chole, Rice, Roti, Raita" },
  { day: "Wednesday", breakfast: "Paratha, Curd, Tea", lunch: "Dal Fry, Rice, Roti, Aloo Gobi", snack: "Vada Pav, Juice", dinner: "Kadhi, Rice, Roti, Bhindi" },
  { day: "Thursday", breakfast: "Upma, Bread Butter, Coffee", lunch: "Sambar, Rice, Roti, Beans", snack: "Pav Bhaji, Lemonade", dinner: "Dal Makhani, Jeera Rice, Naan" },
  { day: "Friday", breakfast: "Chole Bhature, Tea", lunch: "Mix Dal, Rice, Roti, Paneer", snack: "Spring Roll, Tea", dinner: "Biryani, Raita, Salad" },
  { day: "Saturday", breakfast: "Dosa, Chutney, Coffee", lunch: "Kadai Paneer, Rice, Roti", snack: "Maggi, Cold Drink", dinner: "Malai Kofta, Rice, Butter Naan" },
  { day: "Sunday", breakfast: "Pancakes, Fruits, Juice", lunch: "Special Thali", snack: "Ice Cream, Cookies", dinner: "Pasta, Garlic Bread, Soup" },
];

const today = new Date().getDay(); // 0=Sun
const dayIndex = today === 0 ? 6 : today - 1;

const StudentMessMenu = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Mess Menu</h1>
        <p className="text-muted-foreground mt-1">Weekly meal schedule</p>
      </div>

      <div className="space-y-3">
        {weekMenu.map((day, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`glass-card rounded-xl p-4 ${i === dayIndex ? "ring-2 ring-primary" : ""}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <UtensilsCrossed size={16} className="text-primary" />
              <h3 className="text-sm font-bold text-foreground">{day.day}</h3>
              {i === dayIndex && <span className="text-[10px] font-medium gradient-primary text-primary-foreground rounded-full px-2 py-0.5">Today</span>}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { label: "Breakfast", value: day.breakfast },
                { label: "Lunch", value: day.lunch },
                { label: "Snack", value: day.snack },
                { label: "Dinner", value: day.dinner },
              ].map((meal, j) => (
                <div key={j} className="rounded-lg bg-muted/50 p-2">
                  <p className="font-medium text-muted-foreground uppercase text-[10px] tracking-wider">{meal.label}</p>
                  <p className="text-foreground mt-0.5">{meal.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StudentMessMenu;
