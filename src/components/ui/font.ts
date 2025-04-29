// Importing the Inter and Kiwi Maru font families from Google Fonts
import { Inter, Kiwi_Maru } from 'next/font/google';

// Configuring the Inter font to only include the Latin subset
export const inter = Inter({ subsets: ['latin'] });

// Configuring the Kiwi Maru font to have a light weight (300) and only include the Latin subset
export const kiwi_Maru = Kiwi_Maru({ weight: ['300'], subsets: ['latin'] });
