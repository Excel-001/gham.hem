import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OrnamentalDivider from './OrnamentalDivider';
import { 
  Sparkles, 
  Shield, 
  Award, 
  Scissors, 
  Maximize2, 
  X, 
  Play, 
  Pause, 
  ArrowUpRight,
  Film
} from 'lucide-react';

const BRAND_ROW_1 = [
  {
    id: "brand-1",
    title: "The Obsidian Grand Peak Tuxedo",
    category: "Tuxedos & Black Tie",
    tagline: "Hand-Crafted Satin Peak Lapel",
    description: "The pinnacle of black tie mastery. Sculpted with a razor-sharp silk satin peak lapel, full floating canvas, and trousers lined in pure Bemberg cupro.",
    fabric: "Super 160s Vitale Barberis Canonico Merino Wool & Silk Satin",
    silhouette: "Sculpted British Athletic Cut · Full Floating Canvas",
    lapel: "Architectural Silk Satin Peak Lapel",
    img: "https://instagram.fabv2-1.fna.fbcdn.net/v/t51.82787-15/645868725_17868043830576139_1337393783227047462_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=107&ig_cache_key=Mzg0Mzk2NDc2NzA3Mzc3MzY5MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5oZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=gC-Ir1kni2oQ7kNvwHnYV4n&_nc_oc=AdrmRwrVGhj5n6LT5_8Kn-5hYjH7QoOkDWi3r3EM2NBzshy6uffLc__cgZtL4R4dSlc&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=7&_nc_ht=instagram.fabv2-1.fna&_nc_gid=Yiob1vDtFbGUtFVEOCuuhA&_nc_ss=7a22e&oh=00_AQItDCXmEMY0gANptD8HcsyP9lN9yxNK0qLUAbUgRjF7GA&oe=6A9C2F6E",
    video: "https://instagram.fabv2-1.fna.fbcdn.net/o1/v/t16/f2/m84/AQPppZUJnaS1xLSqEN_enuoWc3LMon3pWcz6IrJFlH9ThGzld3z_Fd28wBp6QlNYsCFjBkh8my70arF9zuHp40TvpzA1EwR4wmqtOrc.mp4?_nc_cat=102&_nc_oc=Ado937-GXOsFumQIpml1VDT2SoweccJh4HHW2AdgQdNbN22CTJIOR8aUrzUZrqxDowY&_nc_sid=5e9851&_nc_ht=instagram.fabv2-1.fna.fbcdn.net&_nc_ohc=xnneJLqK_wkQ7kNvwFVgD0f&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6MjIxMTM2NjcwNjQ3ODYwMCwiYXNzZXRfYWdlX2RheXMiOjQsInZpX3VzZWNhc2VfaWQiOjEyMzc0LCJkdXJhdGlvbl9zIjo1MywidXJsZ2VuX3NvdXJjZSI6Ind3dyJ9&ccb=17-1&vs=ed28d8c75c69a65e&_nc_vs=HBksFQIYTGlnX2JhY2tmaWxsX3RpbWVsaW5lX3ZvZC83NDRCNkQ5NkExNUEwNEMzMUY2RTkyQzc1MEY2RUQ5NF92aWRlb19kYXNoaW5pdC5tcDQVAALIARIAFQIYUWlnX3hwdl9wbGFjZW1lbnRfcGVybWFuZW50X3YyLzA3NEQwRTU0MjUyOUMzMEJCRjFDRUIwNTM2OTZBMkIzX2F1ZGlvX2Rhc2hpbml0Lm1wNBUCAsgBEgAoABgAGwKIB3VzZV9vaWwBMRJwcm9ncmVzc2l2ZV9yZWNpcGUBMRUAACaQ-I_wvc7tBxUCKAJDMywXQEqAAAAAAAAYEmRhc2hfYmFzZWxpbmVfMV92MREAdf4HZazBAQA&_nc_gid=OYys4WgXmbZZfyR7fRi1Sg&_nc_zt=28&_nc_ss=7a22e&oh=00_AQIWdJYaLJoVC0zXUFPW6W7acOq5PAmfZ1_j9TO4Q7epQg&oe=6A985482"
  },
  {
    id: "brand-2",
    title: "The Savile Double-Breasted Chalkstripe",
    category: "Double-Breasted",
    tagline: "6x2 Executive Button Stance",
    description: "An unequivocal statement of executive presence. Charcoal navy with subtle chalkstripes matched millimeter-by-millimeter across all seams and pockets.",
    fabric: "English Fox Brothers Flannel Super 140s Wool (340g)",
    silhouette: "6x2 Button Stance · Broad Roped Shoulder",
    lapel: "Swept 4.2-inch Bellied Peak Lapel",
    img: "https://instagram.fabv2-2.fna.fbcdn.net/v/t51.82787-15/779167321_17899368684576139_477763797171678615_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=111&ig_cache_key=Mzk2NzA3MzM3OTYyOTAxOTM1Mw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMzA3Mi5oZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=4-vJOJj90owQ7kNvwHjjzR-&_nc_oc=AdpRvmOdl4CxdytnAQPayVXcfxQFbkzi1HD3MT_I6PZvZzBKNPavyvB0InsUO8A3u4g&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=7&_nc_ht=instagram.fabv2-2.fna&_nc_gid=ddpPDEU_zSvVsi_ccO02dg&_nc_ss=7a22e&oh=00_AQKzPzwUlK4MXyMZWMANdO1t9pWNpmVCCcAhjENtnnslAw&oe=6A9C3E20"
  },
  {
    id: "brand-3",
    title: "The Imperial Sartorial Native Set",
    category: "Native & Bespoke Attire",
    tagline: "3-Piece Ceremonial Drape",
    description: "The zenith of African couture. Deep Burgundy wool adorned with hand-guided geometric embroidery in muted champagne gold thread.",
    fabric: "Heavy Italian Crepe Wool & Hand-Stitched Gold Filigree",
    silhouette: "3-Piece Ceremonial Drape · Architectural Drop",
    lapel: "Structured Mandarin Band Collar with Concealed Placket",
    img: "https://instagram.fabv2-2.fna.fbcdn.net/v/t51.82787-15/669634230_17875404750576139_2182305543426236219_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=109&ig_cache_key=Mzg3MjA5OTQyMDQ5NDEyMTk0MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5oZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=LqJzJt7av3oQ7kNvwFtjvtw&_nc_oc=AdrP1hSNViwBiurwi99q6s52IyFlrAbWFELLw_K2_7wjlQR77XUaC3wZLO_4wKPqhR8&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=7&_nc_ht=instagram.fabv2-2.fna&_nc_gid=iGxXhUQsFNMdC_OZ4h3ZHQ&_nc_ss=7a22e&oh=00_AQKw4UZFNgIoPA64tmtgL9y5QeD0IEnWxSdvXHqfp3tyVg&oe=6A9C3D07"
  },
  {
    id: "brand-4",
    title: "The Bordeaux Velvet Dinner Jacket",
    category: "Velvet & Evening Jackets",
    tagline: "100% Cotton-Silk Velvet by Scabal",
    description: "Sumptuous rich wine velvet catching ambient evening light. Finished with silk grosgrain trims and personalized monogrammed lining.",
    fabric: "100% Cotton-Silk Velvet by Scabal (Belgium)",
    silhouette: "Single-Button · Hand-Rolled Soft Shoulder",
    lapel: "Continuous Silk Grosgrain Shawl Collar",
    img: "https://instagram.fabv2-2.fna.fbcdn.net/v/t51.82787-15/661200551_17875063308576139_3982723666105863405_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=100&ig_cache_key=Mzg3MDc1NTU3MDEyMzA0MDk0NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5oZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=7sTRR1LiTysQ7kNvwHjy9Zs&_nc_oc=Adr0CYI2HKzscykP3ESSvgONgPEpdaiYJqQdxoX3p4D2i2yggqDZ_d6zudBnpcsXodk&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=7&_nc_ht=instagram.fabv2-2.fna&_nc_gid=DrSZCxTmWfyZo95EDds0zA&_nc_ss=7a22e&oh=00_AQIf6wvpiAxWlTvuR0yLMxis4aGfyd2mcK0oKcqaPdmj1w&oe=6A9C2F3B"
  },
  {
    id: "brand-5",
    title: "The Mayfair Tailored Two-Piece",
    category: "Classic Two-Piece",
    tagline: "Loro Piana Super 150s Blend",
    description: "Intricate sartorial suiting featuring a sculptured waistline, hand-padded floating canvas, and trousers with side adjusters.",
    fabric: "Loro Piana Super 150s Wool-Cashmere Blend",
    silhouette: "Tapered Waist · Soft Roped Shoulder Cut",
    lapel: "3.5-inch Notched Lapel with Milanese Stitch",
    img: "https://instagram.fabv2-2.fna.fbcdn.net/v/t51.82787-15/661200551_17875063308576139_3982723666105863405_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=100&ig_cache_key=Mzg3MDc1NTU3MDEyMzA0MDk0NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5oZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=7sTRR1LiTysQ7kNvwHjy9Zs&_nc_oc=Adr0CYI2HKzscykP3ESSvgONgPEpdaiYJqQdxoX3p4D2i2yggqDZ_d6zudBnpcsXodk&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=7&_nc_ht=instagram.fabv2-2.fna&_nc_gid=DrSZCxTmWfyZo95EDds0zA&_nc_ss=7a22e&oh=00_AQIf6wvpiAxWlTvuR0yLMxis4aGfyd2mcK0oKcqaPdmj1w&oe=6A9C2F3B"
  }
];

const BRAND_ROW_2 = [
  {
    id: "brand-6",
    title: "The Imperial Sovereign Ceremonial Tuxedo",
    category: "Wedding & Ceremonial",
    tagline: "Black Tie & Destination Nuptials",
    description: "A showstopping wedding ensemble in radiant ceremonial barathea, lined in rich ruby cupro with wide silk grosgrain collar.",
    fabric: "Deep Forest Silk-Wool Barathea & Black Grosgrain",
    silhouette: "Single Satin Button · Extended Slanted Jetted Pockets",
    lapel: "Wide Black Grosgrain Silk Shawl Collar",
    img: "https://instagram.fabv2-2.fna.fbcdn.net/v/t51.82787-15/574348927_17851826091576139_1690724833634882442_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=110&ig_cache_key=Mzc1NzgzNTc1NzI0ODM0NDMxOQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5oZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=k0VHvRT9Us8Q7kNvwG6wfgT&_nc_oc=Adr63hUA_QF9bkxqePrTxwuLAcjVXJHc2qhw0OpKubACbksZItuuMlyor3DrlVVASRY&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=7&_nc_ht=instagram.fabv2-2.fna&_nc_gid=TmagjdsH2RcrbAXiY4cTSA&_nc_ss=7a22e&oh=00_AQKAg4lgEaG7nW0f2s1YnpXpE29_Ua53a6jWhz227O7qTg&oe=6A9C2BFF"
  },
  {
    id: "brand-7",
    title: "The Senator Structured Band Kaftan",
    category: "Native & Bespoke Attire",
    tagline: "Minimalist Senator Silhouette",
    description: "Refined minimalist senator attire. Razor-sharp silhouette with clean chest geometry, tonal piping, and tapered matching trousers.",
    fabric: "Super 150s Cool Wool & Fine Japanese Micro-Crepe",
    silhouette: "Tailored Slim Fit · Concealed Zipper & Hand-Pleated Cuffs",
    lapel: "Modern Angular Mandarin Neckline with Gunmetal Hardware",
    img: "https://instagram.fabv2-2.fna.fbcdn.net/v/t51.82787-15/652633780_17870574465576139_2583124699277563185_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=109&ig_cache_key=Mzg1Mzk2NDM5MTc4ODM3OTY0Mw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5oZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=a1AF3eeEdN4Q7kNvwFcB0W8&_nc_oc=AdpS95NoJV_sKMBjMuF4-xVNY3Auij-GdezYK8FBR3ZlQamIic0XzXDbnYWUMHULwgU&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=7&_nc_ht=instagram.fabv2-2.fna&_nc_gid=9JzspfRV3T1aeiw70n_tfg&_nc_ss=7a22e&oh=00_AQL6J934LeytlmIdqkRnFgIOH2vKo1i7oj71H7OKtwe_Tw&oe=6A9C559E"
  },
  {
    id: "brand-8",
    title: "The Royal Navy Peak Lapel Two-Piece",
    category: "Classic Two-Piece",
    tagline: "Dormeuil Royal 11 Silk & Wool",
    description: "Luminous deep navy with an understated sheen. Hand-padded chest piece, mother-of-pearl buttons, and working surgeon's cuffs.",
    fabric: "Dormeuil Royal 11 Silk & Super 130s Worsted Wool",
    silhouette: "Two-Button Single Breasted · Slanted Ticket Pocket",
    lapel: "High-Gorge Silk-Lined Peak Lapel",
    img: "https://instagram.fabv2-1.fna.fbcdn.net/v/t51.82787-15/600975134_17856900225576139_8703538404419080499_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=Mzc4ODEyMTA3MzE2Mjk1ODgwMg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=q_XsIl3yjHoQ7kNvwFU2xrq&_nc_oc=AdrpFyl_bXSpl01c3Dl3I8ApRBpWDrV8B8F8QcW8IfXbLPomlVagEMYSrvNMVG5IHC8&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=7&_nc_ht=instagram.fabv2-1.fna&_nc_gid=BHE4dWwQfoNSNgbf-2KaVg&_nc_ss=7a22e&oh=00_AQKGz8eJsIE-xBzG0qEeaHojnRjbGC1LxrWTarumCYkQlA&oe=6A9C5002"
  },
  {
    id: "brand-9",
    title: "The Sahara Sand Silk-Linen Two-Piece",
    category: "Classic Two-Piece",
    tagline: "Resort & Destination Formalwear",
    description: "Effortless Riviera elegance. Pure breathable linen infused with silk for crisp structure without stiff creasing.",
    fabric: "Irish Linen & Mulberry Silk Blend by Solbiati",
    silhouette: "Unlined Neapolitan Spalla Camicia Shoulder",
    lapel: "Soft Notch Lapel with Hand Pick-Stitching",
    img: "https://instagram.fabv2-2.fna.fbcdn.net/v/t51.82787-15/642133901_17867478507576139_6607600152729982049_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=105&ig_cache_key=Mzg0MTc2MDgzMTIxNDUwNTMwMw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5oZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=cPPxPw3nC1oQ7kNvwGSRun3&_nc_oc=Adp_L-PXyMiRZmYKkSFlrJ9ep0tgQ9z2GJ0vmkh0Opdxegpd-FPfQN8cUJhVYceCLhY&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=7&_nc_ht=instagram.fabv2-2.fna&_nc_gid=TaUHI1oO5LQpVTr6iD_xmA&_nc_ss=7a22e&oh=00_AQIicIbAZvKcWYb61JVR1A19_XK1-Op1TBfGr6cEOwaPBw&oe=6A9C3EA3"
  },
  {
    id: "brand-10",
    title: "The Sovereign Black Tie Tuxedo",
    category: "Tuxedos & Black Tie",
    tagline: "Architectural Silk Satin Lapel",
    description: "Conceived for grand galas and high-society nuptials. Crafted with full floating horsehair canvas that molds organically to the body.",
    fabric: "Super 160s Merino Wool & Silk Satin",
    silhouette: "British Athletic Tailoring · Silk Grosgrain Trim",
    lapel: "Architectural Silk Satin Peak Lapel",
    img: "https://instagram.fabv2-1.fna.fbcdn.net/v/t51.82787-15/645868725_17868043830576139_1337393783227047462_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=107&ig_cache_key=Mzg0Mzk2NDc2NzA3Mzc3MzY5MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5oZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=gC-Ir1kni2oQ7kNvwHnYV4n&_nc_oc=AdrmRwrVGhj5n6LT5_8Kn-5hYjH7QoOkDWi3r3EM2NBzshy6uffLc__cgZtL4R4dSlc&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=7&_nc_ht=instagram.fabv2-1.fna&_nc_gid=Yiob1vDtFbGUtFVEOCuuhA&_nc_ss=7a22e&oh=00_AQItDCXmEMY0gANptD8HcsyP9lN9yxNK0qLUAbUgRjF7GA&oe=6A9C2F6E"
  }
];

export default function HeroPhotoWall({ onExploreClick, onBookClick }) {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const stats = [
    { label: "Bespoke Cut", value: "Full Floating Canvas", icon: Scissors },
    { label: "Precision", value: "40+ Anatomy Points", icon: Award },
    { label: "Curated Cloths", value: "Dormeuil & Scabal", icon: Shield },
    { label: "Exclusivity", value: "8 Fittings Weekly", icon: Sparkles }
  ];

  // Quadruple items to ensure seamless infinite looping on all screens
  const row1Items = [...BRAND_ROW_1, ...BRAND_ROW_1, ...BRAND_ROW_1, ...BRAND_ROW_1];
  const row2Items = [...BRAND_ROW_2, ...BRAND_ROW_2, ...BRAND_ROW_2, ...BRAND_ROW_2];

  return (
    <section className="relative pt-28 md:pt-36 pb-20 overflow-hidden bg-white">
      {/* Soft Burgundy & White Subtle Radial Atmosphere */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(106, 28, 36, 0.05) 0%, rgba(255, 255, 255, 0.98) 75%)'
        }}
      />

      <div className="max-w-[1700px] mx-auto px-4 md:px-8 relative z-20">
        {/* Hero Top Title & Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-10 md:mb-14"
        >
          <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-light text-[#1A1A1A] tracking-tight leading-[1.05] mb-6">
            Crafted with <span className="italic font-normal text-[#6A1C24]">Uncompromised</span> Precision.
          </h1>

          <p className="font-cormorant italic text-xl md:text-2xl text-[#5C5650] max-w-2xl mx-auto mb-8 leading-relaxed">
            "Bespoke suits, tuxedos, and sartorial native attire hand-drafted for the world's most discerning gentlemen."
          </p>

          {/* Action CTA & Motion Controller */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onBookClick}
              className="bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-xs uppercase tracking-widest font-semibold px-9 py-4 transition-colors duration-300 cursor-pointer rounded-[2px] shadow-lg hover:shadow-xl flex items-center gap-2.5 border border-[#C8B8A6]/40"
            >
              <Sparkles className="w-4 h-4 text-[#C8B8A6]" />
              <span>Book Private Fitting</span>
            </motion.button>

            {/* Play / Pause Interactive Carousel Toggle */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsPaused(!isPaused)}
              className="bg-[#FAFAFA] hover:bg-[#F0F0F0] text-[#1A1A1A] text-xs uppercase tracking-widest font-semibold px-5 py-4 transition-colors duration-200 cursor-pointer rounded-[2px] border border-[#C8B8A6] flex items-center gap-2"
              title={isPaused ? "Resume Carousel Movement" : "Pause Carousel"}
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-[#6A1C24] fill-[#6A1C24]" />
                  <span className="hidden sm:inline">Resume Motion</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#6A1C24]" />
                  <span className="hidden sm:inline">Pause Motion</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Double Interactive Image Carousel Container */}
        <div className="relative my-8 carousel-container">
          {/* Left & Right Soft Fade Gradient Masks for Seamless Flow */}
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 md:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-30 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 md:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-30 pointer-events-none" />

          {/* ROW 1: Slides Left -> Right */}
          <div className="overflow-hidden mb-4 sm:mb-5">
            <div 
              className={`animate-marquee-left gap-3 sm:gap-4 md:gap-5 py-2 ${isPaused ? 'carousel-track-paused' : ''}`}
            >
              {row1Items.map((piece, index) => {
                return (
                  <div
                    key={`r1-${piece.id}-${index}`}
                    onMouseEnter={() => setHoveredCardId(`r1-${index}`)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    onClick={() => setSelectedPiece(piece)}
                    className="relative group shrink-0 w-[240px] sm:w-[280px] md:w-[320px] h-[370px] sm:h-[420px] md:h-[470px] rounded-[2px] overflow-hidden border border-[#C8B8A6]/70 bg-[#1A1A1A] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 ease-out hover:scale-[1.03] hover:border-[#6A1C24] hover:z-20 ring-1 ring-transparent hover:ring-[#6A1C24]/30"
                  >
                    {/* Brand Product Image */}
                    <img
                      src={piece.img}
                      alt={piece.title}
                      loading="lazy"
                      className="w-full h-full object-cover saturate-[0.9] group-hover:saturate-105 group-hover:scale-110 transition-all duration-700 ease-out"
                    />

                    {/* Dark Editorial Gradient Layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/95 via-[#1A1A1A]/35 to-black/10 opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Top Tag & Interactive Icon */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                      <span className="bg-[#1A1A1A]/85 backdrop-blur-sm text-[#F4EFEA] text-[9px] uppercase tracking-widest font-semibold px-2.5 py-1 border border-[#C8B8A6]/40 rounded-[1px]">
                        {piece.category}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-[#FAF7F4]/90 backdrop-blur-xs flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#6A1C24] group-hover:text-[#F4EFEA] transition-colors shadow-sm">
                        {piece.video ? <Film className="w-3.5 h-3.5 text-[#D4AF37]" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                      </div>
                    </div>

                    {/* Bottom Metadata & Interactive Caption */}
                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 flex flex-col justify-end text-left">
                      <span className="text-[10px] uppercase tracking-widest text-[#C8B8A6] font-semibold mb-1 block font-sans">
                        {piece.tagline}
                      </span>
                      <h3 className="font-cormorant text-2xl sm:text-3xl font-light text-[#F4EFEA] leading-tight mb-2 group-hover:text-[#C8B8A6] transition-colors">
                        {piece.title}
                      </h3>
                      <p className="text-xs text-[#E5DDD5]/80 line-clamp-2 font-sans font-normal leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        {piece.description}
                      </p>

                      {/* Explore Button on Hover */}
                      <div className="mt-3 flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>Inspect Sartorial Details</span>
                        <Maximize2 className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ROW 2: Slides Right -> Left */}
          <div className="overflow-hidden">
            <div 
              className={`animate-marquee-right gap-3 sm:gap-4 md:gap-5 py-2 ${isPaused ? 'carousel-track-paused' : ''}`}
            >
              {row2Items.map((piece, index) => {
                return (
                  <div
                    key={`r2-${piece.id}-${index}`}
                    onMouseEnter={() => setHoveredCardId(`r2-${index}`)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    onClick={() => setSelectedPiece(piece)}
                    className="relative group shrink-0 w-[240px] sm:w-[280px] md:w-[320px] h-[370px] sm:h-[420px] md:h-[470px] rounded-[2px] overflow-hidden border border-[#C8B8A6]/70 bg-[#1A1A1A] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 ease-out hover:scale-[1.03] hover:border-[#6A1C24] hover:z-20 ring-1 ring-transparent hover:ring-[#6A1C24]/30"
                  >
                    {/* Brand Product Image */}
                    <img
                      src={piece.img}
                      alt={piece.title}
                      loading="lazy"
                      className="w-full h-full object-cover saturate-[0.9] group-hover:saturate-105 group-hover:scale-110 transition-all duration-700 ease-out"
                    />

                    {/* Dark Editorial Gradient Layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/95 via-[#1A1A1A]/35 to-black/10 opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Top Tag & Interactive Icon */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                      <span className="bg-[#1A1A1A]/85 backdrop-blur-sm text-[#F4EFEA] text-[9px] uppercase tracking-widest font-semibold px-2.5 py-1 border border-[#C8B8A6]/40 rounded-[1px]">
                        {piece.category}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-[#FAF7F4]/90 backdrop-blur-xs flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#6A1C24] group-hover:text-[#F4EFEA] transition-colors shadow-sm">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Bottom Metadata & Interactive Caption */}
                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 flex flex-col justify-end text-left">
                      <span className="text-[10px] uppercase tracking-widest text-[#C8B8A6] font-semibold mb-1 block font-sans">
                        {piece.tagline}
                      </span>
                      <h3 className="font-cormorant text-2xl sm:text-3xl font-light text-[#F4EFEA] leading-tight mb-2 group-hover:text-[#C8B8A6] transition-colors">
                        {piece.title}
                      </h3>
                      <p className="text-xs text-[#E5DDD5]/80 line-clamp-2 font-sans font-normal leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        {piece.description}
                      </p>

                      {/* Explore Button on Hover */}
                      <div className="mt-3 flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>Inspect Sartorial Details</span>
                        <Maximize2 className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tailoring Standards Strip */}
        <div className="mt-14 border-t border-b border-[#C8B8A6]/70 py-8 bg-[#FAFAFA] shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="px-4 border-r last:border-r-0 border-[#C8B8A6]/50 flex flex-col items-center">
                  <Icon className="w-5 h-5 text-[#6A1C24] mb-2" />
                  <span className="text-[10px] md:text-[11px] uppercase tracking-widest font-semibold text-[#8C847C] block mb-1 font-sans">
                    {item.label}
                  </span>
                  <span className="font-cormorant text-lg md:text-xl font-medium text-[#1A1A1A]">
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tagline & Ornamental Divider Below Carousel */}
        <div className="mt-16 md:mt-20 text-center max-w-3xl mx-auto px-4">
          <OrnamentalDivider label="The Sartorial Standard" className="max-w-md mx-auto mb-8" />
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant italic font-light text-3xl md:text-5xl text-[#1A1A1A] leading-snug mb-8"
          >
            "A suit is not merely tailored to your measurements—it is sculpted to your demeanor."
          </motion.h2>

          {/* Hairline Separator */}
          <div className="w-16 h-0.5 bg-[#6A1C24]/60 mx-auto" />
        </div>
      </div>

      {/* Interactive Sartorial Piece Detail Modal */}
      <AnimatePresence>
        {selectedPiece && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPiece(null)}
              className="fixed inset-0 bg-[#1A1A1A]/85 backdrop-blur-md"
            />

            {/* Dialog Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white border border-[#C8B8A6] max-w-4xl w-full rounded-[2px] shadow-2xl z-10 overflow-hidden my-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPiece(null)}
                className="absolute top-4 right-4 z-20 bg-[#1A1A1A]/80 hover:bg-[#6A1C24] text-[#F4EFEA] p-2 rounded-full cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
                {/* Media Showcase */}
                <div className="md:col-span-7 relative bg-[#1A1A1A] min-h-[320px] md:min-h-[480px]">
                  {selectedPiece.video ? (
                    <video
                      src={selectedPiece.video}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={selectedPiece.img}
                      alt={selectedPiece.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute bottom-4 left-4 bg-[#1A1A1A]/85 backdrop-blur-xs px-3 py-1.5 text-[10px] uppercase tracking-widest font-semibold text-[#F4EFEA] border border-[#C8B8A6]/40">
                    {selectedPiece.silhouette}
                  </div>
                </div>

                {/* Content Specifications */}
                <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-[#F4EFEA]">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest font-semibold text-[#6A1C24] block mb-2 font-sans">
                      {selectedPiece.category}
                    </span>

                    <h2 className="font-cormorant text-3xl md:text-4xl font-light text-[#1A1A1A] leading-tight mb-4">
                      {selectedPiece.title}
                    </h2>

                    <p className="font-cormorant italic text-lg text-[#5C5650] mb-6 leading-relaxed">
                      "{selectedPiece.description}"
                    </p>

                    {/* Sartorial Specs */}
                    <div className="space-y-4 pt-4 border-t border-[#C8B8A6]/40">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-semibold text-[#8C847C] block mb-1">
                          Cloth & Provenance
                        </span>
                        <span className="text-xs font-sans text-[#1A1A1A] block font-medium">
                          {selectedPiece.fabric}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-semibold text-[#8C847C] block mb-1">
                          Lapel & Cut Architecture
                        </span>
                        <span className="text-xs font-sans text-[#1A1A1A] block font-medium">
                          {selectedPiece.lapel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Consultation CTA */}
                  <div className="pt-8 mt-6 border-t border-[#C8B8A6]/50">
                    <button
                      onClick={() => {
                        setSelectedPiece(null);
                        onBookClick();
                      }}
                      className="w-full bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-xs uppercase tracking-widest font-semibold py-3.5 transition-colors cursor-pointer rounded-[1px] flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C8B8A6]" />
                      <span>Book Fitting for this Piece</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
