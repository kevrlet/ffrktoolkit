var materiaList = {
	/*
	"": {
		"character": "",
		"location": "",
		"effect": "",
	},
	*/
	"Attunement I": {
		"character": "Tyro",
		"location": "Gapra Whitewood [XIII] (Classic)",
		"effect": "10% damage bonus for exploiting weakness",
	},
	"Attunement II": {
		"character": "Tyro",
		"location": "Chance to drop from any dungeon with cap-broken Tyro in party",
		"effect": "20% damage bonus for exploiting weakness",
	},
	"Mana Spring I": {
		"character": "Black Mage",
		"location": "Village of Dali [IX] (Elite)",
		"effect": "50% chance to restore 1 black magic ability use at the beginning of battle",
	},
	"Mana Spring II": {
		"character": "Black Mage",
		"location": "Hein's Castle [III] (Elite): Win without Black Mage dying",
		"effect": "100% chance to restore 1 black magic ability use at the beginning of battle",
	},
	"Concentration I": {
		"character": "White Mage",
		"location": "Hein's Castle [III] (Classic)",
		"effect": "50% chance to restore 1 white magic ability use at the beginning of battle",
	},
	"Concentration II": {
		"character": "White Mage",
		"location": "Burmecia [IX] (Elite): Win without White Mage dying",
		"effect": "100% chance to restore 1 white magic ability use at the beginning of battle",
	},
	"Summoning Spring I": {
		"character": "Summoner",
		"location": "Macalania Temple [X] (Elite)",
		"effect": "50% chance to restore 1 summoning ability use at the beginning of battle",
	},
	"Summoning Spring II": {
		"character": "Summoner",
		"location": "Chance to drop from any dungeon with cap-broken Summoner in party",
		"effect": "100% chance to restore 1 summoning ability use at the beginning of battle",
	},
	"Master Archer": {
		"character": "Ranger",
		"location": "Lhusu Mines [XII] (Elite)",
		"effect": "10% damage bonus with Bows",
	},
	"Blue Moon Barrage": {
		"character": "Ranger",
		"location": "Chance to drop from any dungeon with cap-broken Ranger in party",
		"effect": "16% chance to trigger Barrage (70 potency physical, 4 random hits) when using Attack",
	},
	"Concert Musician": {
		"character": "Bard",
		"location": "Missile Base [VIII] (Elite)",
		"effect": "10% damage bonus with Instruments",
	},
	"Zealot": {
		"character": "Bard",
		"location": "Chance to drop from any dungeon with cap-broken Bard in party",
		"effect": "Attack becomes a 60 potency AoE",
	},
	"Self-Sacrifice": {
		"character": "Josef",
		"location": "Coliseum [II] (Elite)",
		"effect": "10% boost to ATK and DEF, begin battle with Sap",
	},
	"Double Hit": {
		"character": "Josef",
		"location": "Chance to drop from FFII dungeons with cap-broken Josef in party",
		"effect": "Two attacks at 65 potency",
	},
	"Gore-Stained Blade I": {
		"character": "Cecil, Dark Knight",
		"location": "Light Against the Darkness Event",
		"effect": "Attack deals 20% more damage, but deals 50 potency non-elemental damage to self",
	},
	"Gore-Stained Blade II": {
		"character": "Cecil, Dark Knight",
		"location": "Chance to drop from FFIV dungeons with cap-broken Dark Knight Cecil in party",
		"effect": "Attack deals 30% more damage, but deals 50 potency non-elemental damage to self",
	},
	"Indomitable Spirit": {
		"character": "Cecil, Paladin",
		"location": "Light Against the Darkness Event",
		"effect": "Grants Protect when at 20% HP or below",
	},
	"Holy Blade": {
		"character": "Cecil, Paladin",
		"location": "Chance to drop from FFIV dungeons with cap-broken Paladin Cecil in party",
		"effect": "Attack deals 10% less damage but heals for 8% of damage dealt",
	},
	"Heart of the Dragoon": {
		"character": "Kain",
		"location": "Hein's Castle [III] (Elite)",
		"effect": "20% damage boost for Jump abilities",
	},
	"Brainwash": {
		"character": "Kain",
		"location": "Tower of Zot - Spire [IV] (Elite): Have Kain use Jump on Barbariccia's tornado form",
		"effect": "10% boost to ATK and DEF, begin battle with Confuse",
	},
	"Eidolon's Gift": {
		"character": "Rydia",
		"location": "Burmecia [IX] (Elite)",
		"effect": "Grants Shell when at 20% HP or below",
	},
	"Eidolon's Bond": {
		"character": "Rydia",
		"location": "Chance to drop from FFIV dungeons with cap-broken Rydia in party",
		"effect": "20% boost to Summon damage",
	},
	"Katana Master": {
		"character": "Cyan",
		"location": "Falcon [VI] (Elite)",
		"effect": "10% damage bonus with Katanas",
	},
	"Samurai Spirit": {
		"character": "Cyan",
		"location": "Mt. Zozo [VI] (Elite): Win without Cyan being KO'd",
		"effect": "Grants Retaliate when at 20% HP or below",
	},
	"SOLDIER Strike": {
		"character": "Cloud",
		"location": "Gapra Whitewood [XIII] (Elite)",
		"effect": "10% damage bonus with Swords",
	},
	"SOLDIER Counter": {
		"character": "Cloud",
		"location": "Shira Cargo Ship [VII] (Elite): Win without Cloud being KO'd",
		"effect": "15% chance to counter direct attacks",
	},
	"Loner": {
		"character": "Sephiroth",
		"location": "The Jenova Project Event",
		"effect": "10% Increase to ATK and DEF for each KO'd ally or empty party slot",
	},
	"Composure": {
		"character": "Squall",
		"location": "The SeeDs of Conflict Event",
		"effect": "20% more damage with Attack, but reduces Soul Break gain from 50 to 35",
	},
	"Gunblade": {
		"character": "Squall",
		"location": "Chance to drop from FFVIII dungeons with cap-broken Squall in party",
		"effect": "16% chance of using a 250 potency Attack instead of the normal Attack",
	},
	"Lionheart": {
		"character": "Squall",
		"location": "Chance to drop from any dungeon with 2nd cap-broken Squall in party",
		"effect": "Gain 75 SB Gauge instead of 50 when hit",
	},
	"Slots": {
		"character": "Selphie",
		"location": "A SeeD Planted Event",
		"effect": "30% chance to trigger Fire, Blizzard, or Thunder when using Attack. Damage is based on MAG", //50 SB charge
	},
	"Solitude": {
		"character": "Irvine",
		"location": "The SeeDs of Conflict Event",
		"effect": "10% Increase to ATK and DEF for each KO'd ally or empty party slot",
	},
	"Master Sniper": {
		"character": "Irvine",
		"location": "Chance to drop from any dungeon with cap-broken Irvine in party",
		"effect": "20% damage bonus with Guns",
	},
	"Blessing of Alexandria": {
		"character": "Garnet",
		"location": "Princess of Alexandria Event",
		"effect": "Grants Regen when at 20% HP or below",
	},
	"Healer": {
		"character": "Garnet",
		"location": "Chance to drop from FFIX dungeons with cap-broken Garnet in party",
		"effect": "Attack becomes a 13 potency heal that deals 120 potency holy damage to undead",
	},
	"Rod Master": {
		"character": "Vivi",
		"location": "Princess of Alexandria Event",
		"effect": "10% boost to Black Magic damage when equipped with a Rod",
	},
	"Devotion": {
		"character": "Vivi",
		"location": "Chance to drop from FFIX dungeons with cap-broken Vivi in party",
		"effect": "Increases MAG by 20%, lowers DEF and RES by 10%",
	},
	"Winning Spirit": {
		"character": "Tidus",
		"location": "Operation Mi'ihen Event",
		"effect": "Grants Haste when at 20% HP or below",
	},
	"High Scorer": {
		"character": "Tidus",
		"location": "Chance to drop from FFX dungeons with cap-broken Tidus in party",
		"effect": "Soul Break gain when using Attack changed from 50 to 65",
	},
	"Light of the Fayth": {
		"character": "Yuna",
		"location": "Marriage of Convenience Event",
		"effect": "10% boost to healing via White Magic",
	},
	"Preemptive Strike": {
		"character": "Wakka",
		"location": "Operation Mi'ihen Event",
		"effect": "15% chance to start battle with a full ATB gauge",
	},
	"Blitz-Eye": {
		"character": "Wakka",
		"location": "Chance to drop from FFX dungeons with cap-broken Wakka in party",
		"effect": "Replaces Attack with Aim (110 potency, 100% accuracy, 1.2s cast time)",
	},
	"Sky Pirate's Pride": {
		"character": "Balthier",
		"location": "The Dreadnought Leviathan Event",
		"effect": "Begin battle with Haste",
	},
	"Seething Mist": {
		"character": "Fran",
		"location": "The Dreadnought Leviathan Event",
		"effect": "Begin battle with Berserk",
	},
	"Viera Virtuoso": {
		"character": "Fran",
		"location": "Chance to drop from any dungeon with cap-broken Fran in party",
		"effect": "20% damage bonus with Bows",
	},
	"Keen Eye": {
		"character": "Quistis",
		"location": "A SeeD Planted Event",
		"effect": "10% damage bonus for exploiting weakness",
	},
	"Magic Flame I": {
		"character": "Red Mage",
		"location": "Giant of Babil, Part II [IV] (Elite)",
		"effect": "30% chance of Attack becoming a 70 potency fire-element ability",
	},
	"Might of Figaro": {
		"character": "Edgar",
		"location": "A Fateful Coin Toss Event",
		"effect": "Grants Protect when at 20% HP or below",
	},
	"Innate Healing": {
		"character": "Sabin",
		"location": "A Fateful Coin Toss Event",
		"effect": "Begin battle with Regen",
	},
	"Father's Pride": {
		"character": "Sazh",
		"location": "Lightning Strikes Event",
		"effect": "Grants Regen when at 20% HP or below",
	},
	"Flash of Light": {
		"character": "Lightning",
		"location": "Lightning Strikes Event",
		"effect": "15% chance to start battle with a full ATB gauge",
	},
	"Grim Determination": {
		"character": "Gordon",
		"location": "Mysidian Tower, Part III [II] (Elite)",
		"effect": "Gain 5% RES per 10% HP lost",
	},
	"Pride of Kashuan": {
		"character": "Gordon",
		"location": "Chance to drop from any dungeon with cap-broken Gordon in party",
		"effect": "Begin battle with Protect",
	},
	"Crystal's Blessing": {
		"character": "Warrior of Light",
		"location": "Alexandria Castle, Part III [IX] (Elite)",
		"effect": "Grants Shell when at 20% HP or below",
	},
	"Light's Wrath": {
		"character": "Warrior of Light",
		"location": "Chance to drop from any dungeon with cap-broken WoL in party",
		"effect": "Attack becomes Holy-elemental",
	},
	"Prayer of the Cetra": {
		"character": "Aerith",
		"location": "Footsteps of the Cetra Event",
		"effect": "Deal 10% more damage with holy attacks",
	},
	"Impetuous Youth": {
		"character": "Eiko",
		"location": "To the Holy Land",
		"effect": "Increases MAG by 10%, lowers RES by 10%",
	},
	"Bastion": {
		"character": "Snow",
		"location": "Nautilus Park, Part II [XIII] (Elite)",
		"effect": "Increases DEF by 10%, lowers ATK by 10%",
	},
	"Indomitable Will": {
		"character": "Snow",
		"location": "Chance to drop from any dungeon with cap-broken Snow in party",
		"effect": "Gain 5% DEF per 10% HP lost",
	},
	"Might of Wind": {
		"character": "Luneth",
		"location": "Saronia Catacombs [III] (Elite)",
		"effect": "Deal 10% more damage with wind attacks",
	},
	"Zeal": {
		"character": "Luneth",
		"location": "Chance to drop from any dungeon with cap-broken Luneth in party",
		"effect": "Begin battle with Haste",
	},
	"Angelo Recover": {
		"character": "Rinoa",
		"location": "To Slay a Sorceress (Reissue)",
		"effect": "30% chance to replace Attack with a 90 potency Attack that heals for 8% of damage dealt",
	},
	"Sage's Sigil": {
		"character": "Tellah",
		"location": "The Man in Black Event",
		"effect": "30% chance to replace Attack with a 70 potency ice element Attack",
	},
	"Devil's Pact": {
		"character": "Golbez",
		"location": "The Man in Black Event",
		"effect": "Gain 5% MAG per 10% HP lost",
	},
	"Might of Fire": {
		"character": "Refia",
		"location": "Via Purifico Maze [X] (Elite)",
		"effect": "Deal 10% more damage with fire attacks",
	},
	"Beloved Soul": {
		"character": "Refia",
		"location": "Chance to drop from any dungeon with cap-broken Refia in party",
		"effect": "Begin battle with Protect",
	},
	"Fraternal Knowledge": {
		"character": "Thancred",
		"location": "Flames of Vengeance Event",
		"effect": "10% damage bonus with Daggers",
	},
	"Cultured Conjurer": {
		"character": "Y'shtola",
		"location": "Flames of Vengeance Event",
		"effect": "10% boost to healing via White Magic",
	},
	"SOLDIER's Pride": {
		"character": "Zack",
		"location": "Aspiring Hero",
		"effect": "10% damage bonus with Swords",
	},
	"Might of Water": {
		"character": "Arc",
		"location": "Highbridge [X] (Elite)",
		"effect": "Deal 10% more damage with water attacks",
	},
	"Gentle Soul": {
		"character": "Arc",
		"location": "Chance to drop from any dungeon with cap-broken Arc in party",
		"effect": "Begin battle with Shell",
	},
	"Bushido": {
		"character": "Auron",
		"location": "Ultimate Guardian Event",
		"effect": "10% damage bonus with Katanas",
	},
	"Ronso Pride": {
		"character": "Kimahri",
		"location": "Ultimate Guardian Event",
		"effect": "10% damage bonus with Spears",
	},
	"Guardian": {
		"character": "Kimahri",
		"location": "Chance to drop from any dungeon with cap-broken Arc in party",
		"effect": "Avoid 1 magic attack when below 10% HP",
	},
	"Vow of Vengeance": {
		"character": "Ashe",
		"location": "Kingdom Reborn Event",
		"effect": "Increases MAG by 10%, lowers ATK by 10%",
	},
	"Freedom's Wish": {
		"character": "Vaan",
		"location": "Kingdom Reborn Event",
		"effect": "Increases ATK by 10%, lowers DEF by 10%",
	},
	"Dragoon's Determination": {
		"character": "Ricard",
		"location": "Tomb of Raithwall, Part IV [XII] (Elite)",
		"effect": "20% boost to ATK, begin battle with Sap",
	},
	"Dragoon's Pride": {
		"character": "Ricard",
		"location": "Chance to drop from any dungeon with cap-broken Ricard in party",
		"effect": "37% chance to use Jump instead of Attack",
	},
	"Axe Master": {
		"character": "Gladiator",
		"location": "Lunar Subterrane, Part II [IV] (Elite)",
		"effect": "10% damage bonus with Axes",
	},
	"Super Critical": {
		"character": "Gladiator",
		"location": "Chance to drop from any dungeon with cap-broken Gladiator in party",
		"effect": "16% chance of using a 280 potency Attack instead of the normal Attack",
	},
	"Hidden Power": {
		"character": "Terra",
		"location": "Touched by Magic Event",
		"effect": "50% chance to restore 1 black magic ability use at the beginning of battle",
	},
	"Reload I": {
		"character": "Barret",
		"location": "Lost Memories Event",
		"effect": "50% chance to restore 1 support ability use at the beginning of battle",
	},
	"Mako Might": {
		"character": "Cloud",
		"location": "Chance to drop from any dungeon with 2nd cap-broken Cloud in party",
		"effect": "Begin battle with 1 SB gauge charged",
	},
	"Planet Guardian": {
		"character": "Red XIII",
		"location": "Great Forest of Moore [V] (Elite)",
		"effect": "Begin battle with Reflect",
	},
	"Seto's Will": {
		"character": "Red XIII",
		"location": "Chance to drop from any dungeon with cap-broken Red XIII in party",
		"effect": "Grants Strong Regen when at 20% HP or below",
	},
	"Shuriken Master": {
		"character": "Ninja",
		"location": "Mt Gagazet, Part II [X] (Elite)",
		"effect": "10% damage bonus with Thrown weapons",
	},
	"Vanish": {
		"character": "Ninja",
		"location": "Chance to drop from any dungeon with cap-broken Ninja in party",
		"effect": "Avoid one physical attack when at 10% HP or below",
	},
	"Ascendance": {
		"character": "Hope",
		"location": "Chasing Hope Event",
		"effect": "10% damage bonus to Black Magic when equipped with a Thrown weapon",
	},
	"Innocence": {
		"character": "Vanille",
		"location": "Chasing Hope Event",
		"effect": "10% chance to use Mend when hit Physically. Mend is a 30 potency self-heal",
	},
	"Hand of the Victor": {
		"character": "Celes",
		"location": "Back to the Sky Event",
		"effect": "30% chance to use Blizzard Strike instead of Attack",
	},
	"All In": {
		"character": "Setzer",
		"location": "Back to the Sky Event",
		"effect": "50% chance to restore 1 combat ability use at the beginning of battle",
	},
	"Elder Sage": {
		"character": "Strago",
		"location": "Back to the Sky Event",
		"effect": "Deal 10% more damage with water attacks",
	},
	"Archer Mage": {
		"character": "Maria",
		"location": "Cultists' Tower, Part II [VI] (Elite)",
		"effect": "10% damage bonus to Black Magic when equipped with a Bow",
	},
	"Rebel Sharpshooter": {
		"character": "Maria",
		"location": "Chance to drop from any dungeon with cap-broken Maria in party",
		"effect": "10% damage bonus to Bows, and Black Magic when equipped with a Bow",
	},
	"Ironclad": {
		"character": "Steiner",
		"location": "Ultima Weapon [VII] (Elite)",
		"effect": "10% boost to DEF when wearing Armor",
	},
	"Knight's Pride": {
		"character": "Steiner",
		"location": "Chance to drop from any dungeon with cap-broken Steiner in party",
		"effect": "25% chance to use Guard (grants Protect) when hit Physically",
	},
	"Wind Wanderer": {
		"character": "Bartz",
		"location": "Big Bridge Showdown Event",
		"effect": "Deal 10% more damage with wind attacks",
	},
	"Warrior's Burden": {
		"character": "Gilgamesh",
		"location": "Big Bridge Showdown Event",
		"effect": "10% boost to DEF when wearing Armor",
	},
	"Fit of Rage": {
		"character": "Galuf",
		"location": "Big Bridge Showdown Event",
		"effect": "Begin battle with Berserk",
	},
	"Martial Master": {
		"character": "Galuf",
		"location": "Chance to drop from any dungeon with cap-broken Galuf in party",
		"effect": "12% change to counter Physical attacks with 65 potency attacks",
	},
	"Oath of Tycoon": {
		"character": "Lenna",
		"location": "Big Bridge Showdown Event",
		"effect": "10% boost to healing via White Magic",
	},
	"Untapped Power": {
		"character": "Zell",
		"location": "Gunblade of the Sorceress Event",
		"effect": "Gain 5% ATK per 10% HP lost",
	},
	"Raw Power": {
		"character": "Zell",
		"location": "Chance to drop from any dungeon with cap-broken Zell in party",
		"effect": "50% chance to start battle with a full ATB gauge",
	},
	"Dirty Trick": {
		"character": "Seifer",
		"location": "Gunblade of the Sorceress Event",
		"effect": "10% chance to use Attack and Fire instead of just Attack",
	},
	"Dragoon's Soul I": {
		"character": "Dragoon",
		"location": "Iifa Tree [IX] (Elite)",
		"effect": "50% chance to restore 1 dragoon ability use at the beginning of battle",
	},
	"Dragoon's Soul II": {
		"character": "Dragoon",
		"location": "Chance to drop from any dungeon with cap-broken Dragoon in party",
		"effect": "100% chance to restore 1 dragoon ability use at the beginning of battle",
	},
	"Misplaced Faith": {
		"character": "Leon",
		"location": "Fifth Ark, Part III [XIII] (Elite)",
		"effect": "Gain 5% DEF per 10% HP lost",
	},
	"Power of Darkness": {
		"character": "Leon",
		"location": "Chance to drop from any dungeon with cap-broken Leon in party",
		"effect": "Attack becomes Dark-elemental",
	},
	"Thief's Code": {
		"character": "Zidae",
		"location": "A Place to Call Home Event",
		"effect": "Begin battle with Haste",
	},
	"Way of the Fist": {
		"character": "Amarant",
		"location": "A Place to Call Home Event",
		"effect": "10% damage bonus with Fists",
	},
	"Inner Fire": {
		"character": "Lulu",
		"location": "Third Pilgrimage Event",
		"effect": "Deal 10% more damage with fire attacks",
	},
	"Helm Expertise": {
		"character": "Dark Knight",
		"location": "Desert Palace [IX] (Elite)",
		"effect": "10% boost to DEF when wearing a Helmet",
	},
	"Dark Blade": {
		"character": "Dark Knight",
		"location": "Chance to drop from any dungeon with cap-broken Dark Knight in party",
		"effect": "When using Attack, 25% to use a 90 potency Attack that absorbs 32% of damage dealt as HP",
	},
	"Cold Steel": {
		"character": "Shadow",
		"location": "Assassin in Black Event",
		"effect": "20% more damage with Attack, but reduces Soul Break gain from 50 to 35",
	},
	"Treasure Hunter's Zeal": {
		"character": "Locke",
		"location": "Assassin in Black Event",
		"effect": "50% chance to restore 1 celerity ability use at the beginning of battle",
	},
	"Heart of the Dancer I": {
		"character": "Mog",
		"location": "Assassin in Black Event",
		"effect": "50% chance to restore 1 dancer ability use at the beginning of battle",
	},
	"Heart of the Dancer II": {
		"character": "Mog",
		"location": "Chance to drop from any dungeon with cap-broken Mog in party",
		"effect": "100% chance to restore 1 dancer ability use at the beginning of battle",
	},
	"Heroic Stance": {
		"character": "Sephiroth",
		"location": "Chance to drop from any dungeon with 2nd cap-broken Sephiroth in party",
		"effect": "20% damage bonus with Katanas",
	},
	"Crimson Lockdown": {
		"character": "Reno",
		"location": "Blood Madness Event",
		"effect": "16% chance for Attack to be replaced with a version of Attack with a 16% chance to inflict Stop",
	},
	"Fury": {
		"character": "Cid",
		"location": "Blood Madness Event",
		"effect": "Begin battle with Berserk",
	},
	"Spellblade Mastery I": {
		"character": "Spellblade",
		"location": "Narse, Part II [VI] (Elite)",
		"effect": "50% chance to restore 1 spellblade ability use at the beginning of battle",
	},
	"Spellblade Mastery II": {
		"character": "Spellblade",
		"location": "Chance to drop from any dungeon with cap-broken Spellblade in party",
		"effect": "100% chance to restore 1 spellblade ability use at the beginning of battle",
	},
	"Paladin's Devotion": {
		"character": "Cecil, Paladin",
		"location": "Chance to drop from any dungeon with 2nd cap-broken Cecil, Paladin in party",
		"effect": "30% chance to use Mend when hit Physically. Mend is a 30 potency self-heal",
	},
	"Witch of Succession": {
		"character": "Rinoa",
		"location": "Chance to drop from any dungeon with 2nd cap-broken Rinoa in party",
		"effect": "15% boost to Black Magic damage",
	},
	"Ace Striker": {
		"character": "Tidus",
		"location": "Chance to drop from any dungeon with 2nd cap-broken Tidus in party",
		"effect": "Attack and abilities grant +50% SB Gauge",
	},
	"Dr. Mog's Teachings": {
		"character": "Tyro",
		"location": "Chance to drop from any dungeon with 2nd cap-broken Tyro in party",
		"effect": "Begin battle with 1 SB gauge charged",
	},
	"Pirate's Vanguard": {
		"character": "Faris",
		"location": "Successors of the Dawn Event",
		"effect": "50% chance to restore 1 support ability use at the beginning of battle",
	},
	"Beastial Affinity": {
		"character": "Krile",
		"location": "Successors of the Dawn Event",
		"effect": "Deal 10% more damage with summons",
	},
	"Empathic Soul": {
		"character": "Lenna",
		"location": "Chance to drop from any dungeon with 2nd cap-broken Lenna in party",
		"effect": "Begin battle with Strong Regen",
	},
	"Self Discipline": {
		"character": "Wakka",
		"location": "Chance to drop from any dungeon with 2nd cap-broken Wakka in party",
		"effect": "Grants Strong Regen when at 50% HP or less",
	},
	"Way of the Samurai I": {
		"character": "Spellblade",
		"location": "Castle Exdeath, Part IV [V] (Elite)",
		"effect": "50% chance to restore 1 samurai ability use at the beginning of battle",
	},
	"Way of the Samurai II": {
		"character": "Spellblade",
		"location": "Chance to drop from any dungeon with cap-broken Samurai in party",
		"effect": "100% chance to restore 1 samurai ability use at the beginning of battle",
	},
	"Blue Mage Defiance": {
		"character": "Strago",
		"location": "Chance to drop from any dungeon with cap-broken Strago in party",
		"effect": "15% chance to counter Black or White Magic attacks with Stone (150 potency, Non-Elemental, Inborn Magic, 6% chance to inflict Confuse)",
	},
	"Archer in White": {
		"character": "Rosa",
		"location": "The Burning Blade Event",
		"effect": "10% boost to MND when a Bow is equipped",
	},
	"Secrets of Eblan": {
		"character": "Edge",
		"location": "The Burning Blade Event",
		"effect": "50% chance to restore 1 ninja ability use at the beginning of battle",
	},
	"Pride of the Red Wings": {
		"character": "Dark Knight Cecil",
		"location": "Chance to drop from any dungeon with 2nd cap-broken Cecil, Dark Knight in party",
		"effect": "20% damage bonus with Swords",
	},
	"Gran Pulse Warrior": {
		"character": "Fang",
		"location": "Fang's Oath Event",
		"effect": "10% damage bonus with Spears",
	},
	"Thunderstroke": {
		"character": "Strago",
		"location": "Chance to drop from any dungeon with 2nd cap-broken Lightning in party",
		"effect": "Removes Attack's 1.5s cast time (it's actually 10ms, which is effectively 0)",
	},
	"Survival Instinct": {
		"character": "Red XIII",
		"location": "Chance to drop from any dungeon with cap-broken Red XIII in party",
		"effect": "100% chance to restore 1 support ability use at the beginning of battle",
	},
	"Gift of the Shinobi": {
		"character": "Yuffie",
		"location": "Hidden Resolve Event",
		"effect": "10% damage bonus with Thrown weapons",
	},
	"Moon's Grace I": {
		"character": "Fusoya",
		"location": "Dreamscape, Part II [VI] (Elite)",
		"effect": "50% chance to restore 1 black magic and white magic ability use at the beginning of battle",
	},
	"Moon's Grace II": {
		"character": "Fusoya",
		"location": "Chance to drop from any dungeon with cap-broken Fusoya in party",
		"effect": "100% chance to restore 1 black magic and white magic ability use at the beginning of battle",
	},
	"Hammer Master": {
		"character": "Viking",
		"location": "Guardian Tree [V] (Elite)",
		"effect": "10% damage bonus with Hammers",
	},
	"Ferocious Charge": {
		"character": "Viking",
		"location": "Chance to drop from any dungeon with cap-broken Viking in party",
		"effect": "Attack becomes Charge (180 potency physical, 3s charge time)",
	},
	"Sacred Duty": {
		"character": "Beatrix",
		"location": "Someone to Protect Event",
		"effect": "50% chance to restore 1 knight ability use at the beginning of battle",
	},
	"Hunger of the Qu": {
		"character": "Quina",
		"location": "Someone to Protect Event",
		"effect": "16% chance to use Drain Strike (170 potency physical, 30% of damage absorbed as HP) instead of Attack",
	},
	"Knight's Charge": {
		"character": "Steiner",
		"location": "Chance to drop from any dungeon with 2nd cap-broken Steiner in party",
		"effect": "Abilities and taking damage grant +25% SB Gauge",
	},
	"Loving Soul": {
		"character": "Penelo",
		"location": "Tempered Resolve Event",
		"effect": "10% boost to MND with a Staff equipped",
	},
	"Art of the Barrage": {
		"character": "Fran",
		"location": "Chance to drop from any dungeon with 2nd cap-broken Fran in party",
		"effect": "16% chance to trigger Barrage (70 potency physical, 4 random hits) when using Attack",
	},
	"Blood of Espers": {
		"character": "Terra",
		"location": "Chance to drop from any dungeon with 2nd cap-broken Terra in party",
		"effect": "13% chance for Black Magic to double-cast",
	},
	"Magic Madness": {
		"character": "Kefka",
		"location": "Forgotten Bond Event",
		"effect": "Increases MAG by 10%, lowers DEF by 10%",
	},
	"Ace Pilot": {
		"character": "Cid",
		"location": "Chance to drop from FFVII dungeons with cap-broken Cid in party",
		"effect": "20% chance to earn double EXP from combat",
	},
	"Evil Thoughts": {
		"character": "Exdeath",
		"location": "The Malice Within Event",
		"effect": "10% chance for Attack to instantly kill a target, if not immune",
	},
	"Fist of Dawn": {
		"character": "Galuf",
		"location": "Chance to drop from any dungeon with 2nd cap-broken Galuf in party",
		"effect": "10% damage bonus with Fists",
	},
	"Legendary Shot": {
		"character": "Jecht",
		"location": "Destiny's Path Event",
		"effect": "10% damage bonus with Blitzballs",
	},
	"Summoner's Prayer": {
		"character": "Yuna",
		"location": "Chance to drop from any dungeon with 2nd cap-broken Yuna in party",
		"effect": "20% boost to MND with a Rod equipped",
	},
	"The Fairies' Boon": {
		"character": "Laguna",
		"location": "A Meeting Beyond Time Event",
		"effect": "10% damage bonus with Guns",
	},
	"Flower of Trabia": { //finish
		"character": "Selphie",
		"location": "Chance to drop from any dungeon with 2nd cap-broken Selphie in party",
		"effect": "Attack becomes Holy-elemental",
	},
	"Holy Might": { //finish
		"character": "Warrior of Light",
		"location": "Chance to drop from any dungeon with 2nd cap-broken Warrior of Light in party",
		"effect": "Deal more damage with holy attacks",
	},
}