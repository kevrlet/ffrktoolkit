var gearTypes = ["Axe", "Ball", "Book", "Bow", "Dagger", "Doll", "Fist", "Gambling Gear", "Gun", "Gun-Arm", "Hairpin", "Hammer", "Instrument", "Katana", "Rod", "Spear", "Staff", "Sword", "Thrown", "Whip", "Armor", "Bracer", "Hat", "Helm", "Light Armor", "Robe", "Shield", "Accessory"];
var weaponTypes = ["Axe", "Ball", "Book", "Bow", "Dagger", "Doll", "Fist", "Gambling Gear", "Gun", "Gun-Arm", "Hairpin", "Hammer", "Instrument", "Katana", "Rod", "Spear", "Staff", "Sword", "Thrown", "Whip"];
var armorTypes = ["Armor", "Bracer", "Hat", "Helm", "Light Armor", "Robe", "Shield"];
var weaponStats = ["ATK", "MAG", "MND", "ACC", "DEF", "RES", "EVA", "SPD", "HP"];
var armorStats = ["DEF", "RES", "EVA", "ATK", "MAG", "MND", "HP", "SPD", "ACC"];
var gearStats = ["HP", "ATK", "MAG", "ACC", "DEF", "RES", "EVA", "MND", "SPD"];
var compStats = ["HP", "ATK", "MAG", "DEF", "RES", "MND"];
var charSkills = ["Burst", "Bard", "Black Magic", "Celerity", "Combat", "Dancer", "Dragoon", "Knight", "Machinist", "Monk", "Ninja", "Samurai", "Spellblade", "Summoning", "Support", "Thief", "White Magic", "Soul Break"];
var allRealms = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XII", "XIII", "XIV"];
var weekRealms = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var selectDun = [];
var selectedChar = "Tyro";
var selectedRealm = "None";
var selectedLevel = 1;
var selectedStats = {"HP": 0, "ATK": 0, "MAG": 0, "ACC": 0, "DEF": 0, "RES": 0, "EVA": 0, "MND": 0, "SPD": 0};
var loggedUser = "";
var lastlogval = "";
var ownedItems = [];
var ownedChars = [];
var limitit = 0;
var ltOwned = 0;
var slotNames = ["Weapons", "Armors", "Accessories"];

/*
I mean something like a list of all your characters you've acquired and their stats at their level, so you can compare stats between characters.
Like in VII, where you have Cloud, Sephiroth, and Zack and want to compare their stats.
Or maybe find out if a level 50 RS Luna have a higher mind stat than a level 60 Lenna.
Obviously the data depends on the player updating their but it beats putting both characters nude in a RS mission to check and then aborting the mission to select the better one and equipping them.
Oh, ad maybe a back button on the Character Overviews page? I keep hitting my Back button and going the to previous website/homepage after I had a look at a character, haha.

make functions to handle element showing/hiding less stupid
*/

//Character functions
function listChars() {
	$('body,html').removeClass('fixWidth');
	clearTables();
	document.getElementById("News").style.display = "none";
	document.getElementById("sidebar").style.display = "none";
	
	var table = document.getElementById("characters");
	var sortedChars = [];
	var insertAt;
	
	if (!table) {
		table = document.createElement("table");
		table.id = "characters";
		document.getElementById("customTables").appendChild(table);
		table.style.display = "block";
	}
	
	var row = table.insertRow(-1);
	
	for (var key in charList) {
		insertAt = sortedChars.length;
		for (var i = 0; i < sortedChars.length; i++) {
			if (key < sortedChars[i]) {
				insertAt = i;
				break;
			}
		}
		sortedChars.splice(insertAt, 0, key);
	}
	
	var mainContainer = $("<div id='charList' class='mainTable col-xs-14 row'></div>");
	var container = $("<div class='col-xs-16'></div>");
	for (var i = 0; i < sortedChars.length; i++) {
		var id = "charList-" + cleanKey(sortedChars[i]);
		var tAdd = "";
		if (arrayContains(ownedChars, sortedChars[i]))
			tAdd = "Owned";
		container.append("<div id='" + id + "' class='col-xs-3 th charPic charBox' onclick='javascript:charOverview(\"" + cleanKey(sortedChars[i]) + "\")'>" + sortedChars[i] + " (" + charList[sortedChars[i]]["realm"] + ")" + "<img src='" + charList[sortedChars[i]]["image"] + "'/>" + tAdd + "</div>");
	}
	$(mainContainer).append(container);
	$("#customTables").append(mainContainer);
	
	var $charList = $("[id^=charList-]");
	$charList.each(function() {
		$(this).hover(function() {$(this).toggleClass('thHover')});
	});
}

function listMateria() {
	clearTables();
	document.getElementById("News").style.display = "none";
	document.getElementById("sidebar").style.display = "none";
	$('body,html').addClass('fixWidth');
	
	var mainContainer = $("<divclass='mainTable col-xs-14 row'></div>");
	var tableContainer = $("<table class='table table-bordered table-responsive' id='table-materia'></table>");
	$(tableContainer).append("<thead><tr><td colspan='6' class='thd itemCell' onclick=javascript:doMateriaSort(\"name\");>Name</td><td colspan='4' class='thd statCell' onclick=javascript:doMateriaSort(\"char\");>Character</td><td colspan='4' class='thd statCell' onclick=javascript:doMateriaSort(\"location\");>Location</td><td colspan='4' class='thd statCell' onclick=javascript:doMateriaSort(\"effect\");>Effect</td></tr></thead>");
    $(tableContainer).append("<tbody id='materia-list'></tbody>");
	$(mainContainer).append(tableContainer);
	
	for (var key in materiaList) {
		var row = $("<tr></tr>");
		var matID = cleanKey(cleanKey(key));
		$(tableContainer).append(row);
		$(row).append("<td id='materia-list-name-" + matID + "' colspan='6' class='th itemCell'><img class='item-xs-left' src='images/materia/" + cleanKey(key) + ".png'></img>" + key + "</td>");
		$(row).append("<td id='materia-list-char-" + matID + "' colspan='4' class='td statCell'>" + materiaList[key]["character"] + "</td>");
		$(row).append("<td id='materia-list-location-" + matID + "' colspan='4' class='td statCell'>" + materiaList[key]["location"] + "</td>");
		$(row).append("<td id='materia-list-effect-" + matID + "' colspan='4' class='td statCell'>" + materiaList[key]["effect"] + "</td>");
	}
	
	$("#customTables").append(mainContainer);
}

function doMateriaSort(column) {
	isText = 1;
	var $items = $("[id^=materia-list-" + column + "-]");
	var parent = $("#materia-list");
	
	$items.sort(function(a,b) {
		var an = a.textContent,
			bn = b.textContent;

		if (an > bn) {
			return parseInt(isText) ? 1 : -1;
		}
		if (an < bn) {
			return parseInt(isText) ? -1 : 1;
		}
		return 0;
	});
	$items.each(function() {
		var id = $(this).attr('id').split('-')[$(this).attr('id').split('-').length - 1];
		var $move = $("[id$='-" + id + "']");
		$move.each(function() {
			var col = $(this).attr('id').split('-')[$(this).attr('id').split('-').length - 2];
			if (col != "test") {
				if (col == column)
					$(this).addClass("sortedHi");
				else
					$(this).removeClass("sortedHi");
				$(this).parent().detach().appendTo(parent);
			}
		});
	});
}

function charOverview(charName) {
	charName = dirtyKey(charName);
	charName = charName.split(' (')[0].trim();
	$('body,html').addClass('fixWidth');
	
	clearTables();
	document.getElementById("News").style.display = "none";
	document.getElementById("sidebar").style.display = "none";
	
	var mainContainer = $("<div id='overview-test' class='mainTable col-xs-14 row'></div>");
	var tableContainer = $("<table class='table table-bordered table-responsive' id='table-overview'></table>");
	$(tableContainer).append("<thead></thead>");
	$(tableContainer).append("<tbody></tbody>");
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	$(row).append("<td colspan='16' class='thd charName'>" + charName + " (" + charList[charName]["realm"] + ")" + "</td>");
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	$(row).append("<td colspan='6' rowspan='11' class='th'><img class='charPicLarge' src='" + charList[charName]["image"] + "'/></td>");
	$(row).append("<td colspan='10' class='th charStatName'>Stats</td>");
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	if (!arrayContains(ownedChars, charName))
		$(row).append("<td colspan='2' class='th charStat' onclick='javascript:updateCharacters(\"" + cleanKey(charName) + "\")'><img id='owned-" + cleanKey(charName) + "' class='char-owned' src='images/style/menuCheckboxIndicator.png'</img>Owned</td>");
	else
		$(row).append("<td colspan='2' class='th charStat' onclick='javascript:updateCharacters(\"" + cleanKey(charName) + "\")'><img id='owned-" + cleanKey(charName) + "' class='char-owned' src='images/style/menuCheckboxIndicatorChecked.png'</img>Owned</td>");
	$(row).append("<td colspan='2' class='th charStat'>1</td>");
	$(row).append("<td colspan='2' class='th charStat'>50</td>");
	if (charList[charName]["65Stats"])
		$(row).append("<td colspan='2' class='th charStat'>65</td>");
	else
		$(row).append("<td colspan='2' class='th charStat'></td>");
	if (charList[charName]["80Stats"])
		$(row).append("<td colspan='2' class='th charStat'>80</td>");
	else
		$(row).append("<td colspan='2' class='th charStat'></td>");
	for (var i = 0; i < gearStats.length; i++) {
		var row = $("<tr></tr>");
		$(tableContainer).append(row);
		$(row).append("<td colspan='2' class='td charStat'>" + gearStats[i] + "</td>");
		$(row).append("<td colspan='2' class='td charStat'>" + charList[charName]["baseStats"][gearStats[i]] + "</td>");
		$(row).append("<td colspan='2' class='td charStat'>" + charList[charName]["maxStats"][gearStats[i]] + "</td>");
		if (charList[charName]["65Stats"])
			$(row).append("<td colspan='2' class='td charStat'>" + charList[charName]["65Stats"][gearStats[i]] + "</td>");
		else
			$(row).append("<td colspan='2' class='td charStat'></td>");
		if (charList[charName]["80Stats"])
			$(row).append("<td colspan='2' class='td charStat'>" + charList[charName]["80Stats"][gearStats[i]] + "</td>");
		else
			$(row).append("<td colspan='2' class='td charStat'></td>");
	}
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	$(row).append("<td colspan='16' class='th charStatName'>Soul Breaks</td>");
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	$(row).append("<td colspan='3' class='th charStat'>Name</td>");
	$(row).append("<td colspan='3' class='th charStat'>Obtained</td>");
	$(row).append("<td colspan='1' class='th charStat'>Bars</td>");
	$(row).append("<td colspan='1' class='th charStat'>Potency</td>");
	$(row).append("<td colspan='2' class='th charStat'>Element</td>");
	$(row).append("<td colspan='4' class='th charStat'>Effect</td>");
	$(row).append("<td colspan='1' class='th charStat'>Rate</td>");
	$(row).append("<td colspan='1' class='th charStat'>Duration</td>");
	for (var key in abilityList) {
		if (abilityList[key]["rarity"] == charName) {
			var row = $("<tr></tr>");
			$(tableContainer).append(row);
			$(row).append("<td colspan='3' class='td sbCell itemClear'><img class='sb-xs-left' src='images/sbs/" + cleanKey(key.split(' (')[0]) + ".png'/>" + key + "</td>");
			$(row).append("<td colspan='3' class='td charStat'>" + abilityList[key]["maxUses"] + "</td>");
			$(row).append("<td colspan='1' class='td charStat'>" + abilityList[key]["baseUses"] + "</td>");
			$(row).append("<td colspan='1' class='td charStat'>" + abilityList[key]["multiplier"] + "</td>");
			$(row).append("<td colspan='2' class='td charStat'>" + abilityList[key]["element"] + "</td>");
			$(row).append("<td colspan='4' class='td charStat'>" + abilityList[key]["effect"] + "</td>");
			$(row).append("<td colspan='1' class='td charStat'>" + abilityList[key]["effectRate"] + "</td>");
			$(row).append("<td colspan='1' class='td charStat'>" + abilityList[key]["duration"] + "</td>");
		}
	}
	var weapons = "";
	for (var i = 0; i < charList[charName]["useWeapons"].length; i++) {
		weapons = weapons + charList[charName]["useWeapons"][i] + " ";
	}
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	$(row).append("<td colspan='16' class='th charStatName'>Weapons</td>");
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	$(row).append("<td colspan='16' class='td charStat'>" + weapons + "</td>");
	var armor = "";
	for (var i = 0; i < charList[charName]["useArmor"].length; i++) {
		armor = armor + charList[charName]["useArmor"][i] + " ";
	}
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	$(row).append("<td colspan='16' class='th charStatName'>Armor</td>");
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	$(row).append("<td colspan='16' class='td charStat'>" + armor + "</td>");
	var ability = "";
	for (var key in charList[charName]["useAbility"]) {
		ability = ability + key + ": " + charList[charName]["useAbility"][key] + " ";
	}
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	$(row).append("<td colspan='16' class='th charStatName'>Abilities</td>");
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	$(row).append("<td colspan='16' class='td charStat'>" + ability + "</td>");
	if (charList[charName]["65Stats"]) {
		var row = $("<tr></tr>");
		$(tableContainer).append(row);
		$(row).append("<td colspan='16' class='th charStatName'>Record Materia</td>");
		var row = $("<tr></tr>");
		$(tableContainer).append(row);
		$(row).append("<td colspan='4' class='td charStat'>Name</td>");
		$(row).append("<td colspan='6' class='td charStat'>Effect</td>");
		$(row).append("<td colspan='6' class='td charStat'>Location</td>");
		for (var key in materiaList) {
			if (materiaList[key]["character"] == charName) {
				var row = $("<tr></tr>");
				$(tableContainer).append(row);
				$(row).append("<td colspan='4' class='td charStat itemClear'><img class='item-xs-left' src='images/materia/" + cleanKey(key.split(' (')[0]) + ".png'/>" + key + "</td>");
				$(row).append("<td colspan='6' class='td charStat'>" + materiaList[key]["effect"] + "</td>");
				$(row).append("<td colspan='6' class='td charStat'>" + materiaList[key]["location"] + "</td>");
			}
		}
	}
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	$(row).append("<td colspan='16' class='th charStatName'>Overview</td>");
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	$(row).append("<td colspan='16' class='td charStat'>" + charList[charName]["overview"] + "</td>");
	$(mainContainer).append(tableContainer);
	$("#customTables").append(mainContainer);
}

function listCharsByItem(item) {
	clearTables();
	document.getElementById("News").style.display = "none";
	document.getElementById("sidebar").style.display = "none";
	var mainContainer = $("<div id='items-test' class='mainTable col-xs-14 row'></div>");
	var container = $("<div class='col-xs-16' id='weapon_table'></div>");
	$(weaponTypes).each(function(w, weapon) { 
		var weapon_nospace = cleanKey(weapon) ;
		var list = "";
		$($.grep(Object.keys(charList), function(x) { return charList[x].useWeapons.indexOf(weapon) >= 0} )).each( function(i, item) { 
			list += "<span><img class='dd_ability' src='" + charList[item]["image"] + "' /><label>" + item + "</label></span>";
		});
		$(container).append(
			'<div class="panel panel-default">' +
				'<a role="button" data-toggle="collapse" data-parent="#weapon_table" href="#collapse' + weapon_nospace + '" aria-controls="collapse' + weapon_nospace + '" >' +
					'<div class="panel-heading th" role="tab" id="heading' + weapon_nospace + '">' +
						'<h4 class="panel-title th">' +
							weapon	+
						'</h4>' +
					'</div>' +
				'</a>' +
				'<div id="collapse' + weapon_nospace + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + weapon_nospace + '" style="height: 0px;">' +
					'<div class="panel-body th" id="body' + weapon_nospace + '">' +
						( list == "" ? "<div style='text-align: center;'>N/A</div>" : list ) +	 
					'</div>' +
				'</div>' +
			'</div>');
	});
	$(mainContainer).append(container);
	$("#customTables").append(mainContainer);
}

function listCharsByAbility(ability) {
	clearTables();
	document.getElementById("News").style.display = "none";
	document.getElementById("sidebar").style.display = "none";
	var mainContainer = $("<div id='items-test' class='mainTable col-xs-14 row'></div>");
	var container = $("<div class='col-xs-16' id='ability_table'></div>");
	$(charSkills).each(function(s, skill) { 
		var skill_nospace = cleanKey(skill);
		var list = '<div class="panel panel-default">';
		for(var i = 1; i <=5; i++){
			var skill_and_star = skill_nospace + '_' + i;
			list += '<a role="button" data-toggle="collapse" href="#collapse' + skill_and_star + '" aria-expanded="true" aria-controls="collapse' + skill_and_star + '" class="collapsed">' +
				'<div class="panel-heading th" role="tab" id="heading' + skill_and_star + '">' +
					'<span class="glyphicon glyphicon-plus-sign"></span><img class="star_img" src="images/style/' + i + 'star.png" /><br>' +
				'</div>' +
			'</a>' +
			'<div id="collapse' + skill_and_star + '" class="panel-collapse collapse skill" role="tabpanel" aria-labelledby="heading' + skill_and_star + '" style="height: 0px;">' +
				'<div class="panel-body ability_box" id="' + skill_and_star + '"></div>' +
			'</div>' ;
		}
		list += '</div>';
		$(container).append(
			'<div class="panel panel-default">' +
				'<a role="button" data-toggle="collapse" data-parent="#ability_table" href="#collapse' + skill_nospace + '" aria-expanded="true" aria-controls="collapse' + skill_nospace + '" class="collapsed">' +
					'<div class="panel-heading th" role="tab" id="heading' + skill_nospace + '">' +
						'<h4 class="panel-title th">' +
							skill	+
						'</h4>' +
					'</div>' +
				'</a>' +
				'<div id="collapse' + skill_nospace + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + skill_nospace + '" style="height: 0px;">' +
					'<div class="panel-body th" id="body' + skill_nospace + '">' +
							list +
					'</div>' +
				'</div>' +
			'</div>');
	});
	$(mainContainer).append(container);
	$("#customTables").append(mainContainer);
	
	$(Object.keys(charList)).each(function(c, character) { 
		var char_nospace = cleanKey(character);
		$(Object.keys(charList[character].useAbility)).each(function(a, ability) {
			var ability_nospace = cleanKey(ability);
			i = charList[character].useAbility[ability];
			$('#heading' + ability_nospace + '_' + i).append("<img class='dd_ability th' src='" + charList[character]["image"] + "'/><label>" + character + "</label>");
		});
	});

	$(Object.keys(abilityList)).each(function(a, ability) { 
		var obj = abilityList[ability]; 
		if(obj.type.indexOf("Soul Break") == -1) {
			var ability_nospace = cleanKey(obj["type"]);
			for (var i = 5; i >= obj["rarity"]; i--)
				$('#'	+ ability_nospace + '_' + i).append("<span><img class='dd_ability th' src='images/abilities/" + cleanKey(ability) + ".png' /><label>" + ability + "</label></span>");
		}
	});
	
	$('.collapse.skill').on('shown.bs.collapse', function(event){
		var glyphicon = $(this).prev().find(".glyphicon")[0];
		$(glyphicon).removeClass('glyphicon-plus-sign');
		$(glyphicon).addClass('glyphicon-minus-sign');
		});
	$('.collapse.skill').on('hidden.bs.collapse', function(event){
		var glyphicon = $(this).prev().find(".glyphicon")[0];
		$(glyphicon).removeClass('glyphicon-minus-sign');
		$(glyphicon).addClass('glyphicon-plus-sign');
	});
}

function charComparison() {
	clearTables();
	document.getElementById("News").style.display = "none";
	document.getElementById("sidebar").style.display = "none";
	var mainContainer = $("<div id='items-test' class='mainTable col-xs-14 row'></div>");
	var container = $("<div id='comp-list' class='col-xs-16'></div>");
	$('body,html').addClass('fixWidth');
	
	var fMax = 0, mMax = 0, sMax = 0, suMax = 0, pMax = 0, tMax = 0, rMax = 0;
	
	container.append("<div class='col-xs-1 th itemCell' onclick='doCompSort(\"name\", 1)'>Name</div>");
	//container.append("<div class='col-xs-1 th charStatName'>Realm</div>");
	for (var i = 0; i < compStats.length; i++) {
		container.append("<div class='col-xs-1 th compCell' onclick='doCompSort(\"" + compStats[i] + "\", 0)'>" + compStats[i] + "</div>");
	}
	container.append("<div class='col-xs-1 th compCell' onclick='doCompSort(\"fighter\", 0)'>Fighter</div>");
	container.append("<div class='col-xs-1 th compCell' onclick='doCompSort(\"ranger\", 0)'>Ranger</div>");
	container.append("<div class='col-xs-1 th compCell' onclick='doCompSort(\"support\", 0)'>Support</div>");
	container.append("<div class='col-xs-1 th compCell' onclick='doCompSort(\"tank\", 0)'>Tank</div>");
	container.append("<div class='col-xs-1 th compCell' onclick='doCompSort(\"mage\", 0)'>Mage</div>");
	container.append("<div class='col-xs-1 th compCell' onclick='doCompSort(\"summoner\", 0)'>Summoner</div>");
	container.append("<div class='col-xs-1 th compCell' onclick='doCompSort(\"priest\", 0)'>Priest</div>");
	for (var key in charList) {
		var currents = compScores(key);
		var fCurr, mCurr, sCurr, suCurr, pCurr, tCurr, rCurr;
		fCurr = parseInt(currents.split('|')[0]);
		mCurr = parseInt(currents.split('|')[1]);
		sCurr = parseInt(currents.split('|')[2]);
		suCurr = parseInt(currents.split('|')[3]);
		pCurr = parseInt(currents.split('|')[4]);
		tCurr = parseInt(currents.split('|')[5]);
		rCurr = parseInt(currents.split('|')[6]);
		fMax = Math.max(fMax, fCurr);
		mMax = Math.max(mMax, mCurr);
		sMax = Math.max(sMax, sCurr);
		suMax = Math.max(suMax, suCurr);
		pMax = Math.max(pMax, pCurr);
		tMax = Math.max(tMax, tCurr);
		rMax = Math.max(rMax, rCurr);
		container.append("<div id='" + cleanKey(key) + "-name' class='col-xs-1 th itemCell itemClear'>" + key + "<img class='item-xs-left' src='" + charList[key]["image"] + "' /></div>");
		//container.append("<div id='" + cleanKey(key) + "-realm' class='col-xs-1 th compCell'>" + charList[key]["realm"] + "</div>");
		for (var i = 0; i < compStats.length; i++) {
			if (charList[key]["80Stats"])
				container.append("<div id='" + cleanKey(key) + "-" + compStats[i] + "' class='col-xs-1 td compCell'>" + charList[key]["80Stats"][compStats[i]] + "</div>");
			else if (charList[key]["65Stats"])
				container.append("<div id='" + cleanKey(key) + "-" + compStats[i] + "' class='col-xs-1 td compCell'>" + charList[key]["65Stats"][compStats[i]] + "</div>");
			else
				container.append("<div id='" + cleanKey(key) + "-" + compStats[i] + "' class='col-xs-1 td compCell'>" + charList[key]["maxStats"][compStats[i]] + "</div>");
		}
		container.append("<div id='" + cleanKey(key) + "-fighter' class='col-xs-1 td compCell'></div>");
		container.append("<div id='" + cleanKey(key) + "-ranger' class='col-xs-1 td compCell'></div>");
		container.append("<div id='" + cleanKey(key) + "-support' class='col-xs-1 td compCell'></div>");
		container.append("<div id='" + cleanKey(key) + "-tank' class='col-xs-1 td compCell'></div>");
		container.append("<div id='" + cleanKey(key) + "-mage' class='col-xs-1 td compCell'></div>");
		container.append("<div id='" + cleanKey(key) + "-summoner' class='col-xs-1 td compCell'></div>");
		container.append("<div id='" + cleanKey(key) + "-priest' class='col-xs-1 td compCell'></div>");
	}
	$(mainContainer).append(container);
	$("#customTables").append(mainContainer);
	for (var key in charList) {
		var currents = compScores(key);
		var fCurr, mCurr, sCurr, suCurr, pCurr, tCurr, rCurr;
		fCurr = currents.split('|')[0];
		fCurr = Math.round((parseInt(fCurr) / parseInt(fMax)) * 100);
		mCurr = currents.split('|')[1];
		mCurr = Math.round((parseInt(mCurr) / parseInt(mMax)) * 100);
		sCurr = currents.split('|')[2];
		sCurr = Math.round((parseInt(sCurr) / parseInt(sMax)) * 100);
		suCurr = currents.split('|')[3];
		suCurr = Math.round((parseInt(suCurr) / parseInt(suMax)) * 100);
		pCurr = currents.split('|')[4];
		pCurr = Math.round((parseInt(pCurr) / parseInt(pMax)) * 100);
		tCurr = currents.split('|')[5];
		tCurr = Math.round((parseInt(tCurr) / parseInt(tMax)) * 100);
		rCurr = currents.split('|')[6];
		rCurr = Math.round((parseInt(rCurr) / parseInt(rMax)) * 100);
		$("#" + cleanKey(key) + "-fighter").text(fCurr);
		$("#" + cleanKey(key) + "-mage").text(mCurr);
		$("#" + cleanKey(key) + "-summoner").text(sCurr);
		$("#" + cleanKey(key) + "-support").text(suCurr);
		$("#" + cleanKey(key) + "-priest").text(pCurr);
		$("#" + cleanKey(key) + "-tank").text(tCurr);
		$("#" + cleanKey(key) + "-ranger").text(rCurr);
		
		
		$resize = $("[id^=" + cleanKey(key) + "]");
		var tallest = 0;
		$resize.each(function() {
			if ($(this).height() > tallest) {
				tallest = $(this).height();
			}
		});
		$resize.height(tallest);
	}
	
}

function compScores(key) {
	//Mage
	var mCurr = 0;
	if (charList[key]["useAbility"]["Black Magic"]) {
		mCurr = 100 * charList[key]["useAbility"]["Black Magic"];
		if (charList[key]["80Stats"])
			mCurr = mCurr + (2 * charList[key]["80Stats"]["MAG"]);
		else if (charList[key]["65Stats"])
			mCurr = mCurr + (2 * charList[key]["65Stats"]["MAG"]);
		else
			mCurr = mCurr + (2 * charList[key]["maxStats"]["MAG"]);
		if (charList[key]["80Stats"])
			mCurr = mCurr + (1 * (charList[key]["80Stats"]["HP"] / 100));
		else if (charList[key]["65Stats"])
			mCurr = mCurr + (1 * (charList[key]["65Stats"]["HP"] / 100));
		else
			mCurr = mCurr + (1 * (charList[key]["maxStats"]["HP"] / 100));
	}
	//Summoner
	var sCurr = 0;
	if (charList[key]["useAbility"]["Summoning"]) {
		sCurr = 100 * charList[key]["useAbility"]["Summoning"];
		if (charList[key]["80Stats"])
			sCurr = sCurr + (2 * charList[key]["80Stats"]["MAG"]);
		else if (charList[key]["65Stats"])
			sCurr = sCurr + (2 * charList[key]["65Stats"]["MAG"]);
		else
			sCurr = sCurr + (2 * charList[key]["maxStats"]["MAG"]);
		if (charList[key]["80Stats"])
			sCurr = sCurr + (1 * (charList[key]["80Stats"]["HP"] / 100));
		else if (charList[key]["65Stats"])
			sCurr = sCurr + (1 * (charList[key]["65Stats"]["HP"] / 100));
		else
			sCurr = sCurr + (1 * (charList[key]["maxStats"]["HP"] / 100));
	}
	//Tank
	var tCurr = 0;
	if (charList[key]["useAbility"]["Knight"]) {
		tCurr = 20 * charList[key]["useAbility"]["Knight"];
		if (charList[key]["80Stats"])
			tCurr = tCurr + (4 * (charList[key]["80Stats"]["HP"] / 100));
		else if (charList[key]["65Stats"])
			tCurr = tCurr + (4 * (charList[key]["65Stats"]["HP"] / 100));
		else
			tCurr = tCurr + (4 * (charList[key]["maxStats"]["HP"] / 100));
		if (charList[key]["80Stats"])
			tCurr = tCurr + (2 * charList[key]["80Stats"]["DEF"]);
		else if (charList[key]["65Stats"])
			tCurr = tCurr + (2 * charList[key]["65Stats"]["DEF"]);
		else
			tCurr = tCurr + (2 * charList[key]["maxStats"]["DEF"]);
		if (charList[key]["80Stats"])
			tCurr = tCurr + (2 * charList[key]["80Stats"]["RES"]);
		else if (charList[key]["65Stats"])
			tCurr = tCurr + (2 * charList[key]["65Stats"]["RES"]);
		else
			tCurr = tCurr + (2 * charList[key]["maxStats"]["RES"]);
	}
	//Fighter
	var fCurr = 0;
	var com = 0, cel = 0, mon = 0, spe = 0, sam = 0, dra = 0, nin = 0;
	if (charList[key]["useAbility"]["Combat"])
		com = charList[key]["useAbility"]["Combat"];
	if (charList[key]["useAbility"]["Celerity"])
		cel = charList[key]["useAbility"]["Celerity"];
	if (charList[key]["useAbility"]["Monk"])
		mon = charList[key]["useAbility"]["Monk"];
	if (charList[key]["useAbility"]["Spellblade"])
		spe = charList[key]["useAbility"]["Spellblade"];
	if (charList[key]["useAbility"]["Samurai"])
		sam = charList[key]["useAbility"]["Samurai"];
	if (charList[key]["useAbility"]["Dragoon"])
		dra = charList[key]["useAbility"]["Dragoon"];
	if (charList[key]["useAbility"]["Ninja"])
		nin = charList[key]["useAbility"]["Ninja"];	
	fCurr = 20 * Math.max(com, cel, mon, spe, sam, dra, nin);
	if (charList[key]["80Stats"])
		fCurr = fCurr + (2 * charList[key]["80Stats"]["ATK"]);
	else if (charList[key]["65Stats"])
		fCurr = fCurr + (2 * charList[key]["65Stats"]["ATK"]);
	else
		fCurr = fCurr + (2 * charList[key]["maxStats"]["ATK"]);
	if (charList[key]["80Stats"])
		fCurr = fCurr + (1 * (charList[key]["80Stats"]["HP"] / 100));
	else if (charList[key]["65Stats"])
		fCurr = fCurr + (1 * (charList[key]["65Stats"]["HP"] / 100));
	else
		fCurr = fCurr + (1 * (charList[key]["maxStats"]["HP"] / 100));
	//Ranger
	var rCurr = 0;
	if (arrayContains(charList[key]["useWeapons"], "Gun") || arrayContains(charList[key]["useWeapons"], "Gun-Arm") || arrayContains(charList[key]["useWeapons"], "Bow") || arrayContains(charList[key]["useWeapons"], "Thrown") || arrayContains(charList[key]["useWeapons"], "Ball")) {
		if (charList[key]["80Stats"])
			rCurr = rCurr + (1 * (charList[key]["80Stats"]["HP"] / 100));
		else if (charList[key]["65Stats"])
			rCurr = rCurr + (1 * (charList[key]["65Stats"]["HP"] / 100));
		else
			rCurr = rCurr + (1 * (charList[key]["maxStats"]["HP"] / 100));
		if (charList[key]["80Stats"])
			rCurr = rCurr + (2 * charList[key]["80Stats"]["ATK"]);
		else if (charList[key]["65Stats"])
			rCurr = rCurr + (2 * charList[key]["65Stats"]["ATK"]);
		else
			rCurr = rCurr + (2 * charList[key]["maxStats"]["ATK"]);
	}
	//Support
	var suCurr = 0;
	if (charList[key]["useAbility"]["Support"] || charList[key]["useAbility"]["Bard"] || charList[key]["useAbility"]["Dancer"]) {
		var sup = 0, bar = 0, dan = 0;
		if (charList[key]["useAbility"]["Support"])
			sup = charList[key]["useAbility"]["Support"];
		if (charList[key]["useAbility"]["Bard"])
			bar = charList[key]["useAbility"]["Bard"];
		if (charList[key]["useAbility"]["Dancer"])
			dan = charList[key]["useAbility"]["Dancer"];
		
		suCurr = 100 * Math.max(sup, bar, dan);
		if (charList[key]["80Stats"])
			suCurr = suCurr + (2 * (charList[key]["80Stats"]["HP"] / 100));
		else if (charList[key]["65Stats"])
			suCurr = suCurr + (2 * (charList[key]["65Stats"]["HP"] / 100));
		else
			suCurr = suCurr + (2 * (charList[key]["maxStats"]["HP"] / 100));
		if (charList[key]["80Stats"])
			suCurr = suCurr + (1 * charList[key]["80Stats"]["ATK"]);
		else if (charList[key]["65Stats"])
			suCurr = suCurr + (1 * charList[key]["65Stats"]["ATK"]);
		else
			suCurr = suCurr + (1 * charList[key]["maxStats"]["ATK"]);
	}
	//Priest
	var pCurr = 0;
	if (charList[key]["useAbility"]["White Magic"]) {
		pCurr = 20 * charList[key]["useAbility"]["White Magic"];
		if (charList[key]["80Stats"])
			pCurr = pCurr + (2 * charList[key]["80Stats"]["MND"]);
		else if (charList[key]["65Stats"])
			pCurr = pCurr + (2 * charList[key]["65Stats"]["MND"]);
		else
			pCurr = pCurr + (2 * charList[key]["maxStats"]["MND"]);
		if (charList[key]["80Stats"])
			pCurr = pCurr + (1 * (charList[key]["80Stats"]["HP"] / 100));
		else if (charList[key]["65Stats"])
			pCurr = pCurr + (1 * (charList[key]["65Stats"]["HP"] / 100));
		else
			pCurr = pCurr + (1 * (charList[key]["maxStats"]["HP"] / 100));
	}
	var currents = fCurr + "|" + mCurr + "|" + sCurr + "|" + suCurr + "|" + pCurr + "|" + tCurr + "|" + rCurr;
	return currents;
}

function doCompSort(column, isText) {
	var $items = $("[id$=-" + column + "]");
	var parent = $("#comp-list");
	
	$items.sort(function(a,b) {
		var an = a.textContent,
			bn = b.textContent;
		
		if (parseInt(isText) == 0) {
			an = parseInt(an);
			bn = parseInt(bn);
		}

		if (an > bn) {
			return parseInt(isText) ? 1 : -1;
		}
		if (an < bn) {
			return parseInt(isText) ? -1 : 1;
		}
		return 0;
	});
	$items.each(function() {
		var id = $(this).attr('id').split('-')[0];
		var $move = $("[id^='" + id + "-']");
		$move.each(function() {
			var col = $(this).attr('id').split('-')[1];
			if (col != "test") {
				if (col == column)
					$(this).addClass("sortedHi");
				else
					$(this).removeClass("sortedHi");
				$(this).detach().appendTo(parent);
			}
		});
	});
}

//Item functions
function listItemsByType(limittoChar) {
	limitit = limittoChar;
	clearTables();
	document.getElementById("News").style.display = "none";
	document.getElementById("sidebar").style.display = "";
	document.getElementById("characterContainer").style.display = "";
	var mainContainer = $("<div class='mainTable col-xs-14 row'></div>");
	
	//create tables and headers
	log(ltOwned);
	for (var i = 0; i < gearTypes.length; i++) {
		if (ltOwned) {
			var showIt = 0;
			for (var j = 0; j < ownedItems.length; j++) {
				if (itemList[ownedItems[j]]) {
					if (itemList[ownedItems[j]]["type"] == gearTypes[i])
						showIt = 1;
				}
			}
		}
		else
			showIt = 1;
		if (showIt) {
			var itemTypeID = "table-items-" + cleanKey(gearTypes[i]);
			var tableContainer = $("<table class='table table-bordered table-responsive' id=" + itemTypeID +"></table>");
			$(tableContainer).append("<thead><tr data-toggle='collapse' data-target='#" + itemTypeID + "-accordion' class='clickable'><td colspan='16' class='thd statCell'>" + gearTypes[i] + "</td></tr></thead>");
			$(tableContainer).append("<tbody id='" + itemTypeID + "-accordion' class='collapse'></tbody>");
			
			var row = $("<tr></tr>");
			$(row).append("<th class='th statCell' onclick='doItemSort(\"name\", \"" + gearTypes[i] + "\", \"1\");'>Name</th>");
			$(row).append("<th class='th statCell' onclick='doItemSort(\"comb\", \"" + gearTypes[i] + "\", \"0\");'>Level</th>");
			$(row).append("<th class='th statCell' onclick='doItemSort(\"rarity\", \"" + gearTypes[i] + "\", \"0\");'>Rarity</th>");
			$(row).append("<th class='th statCell' onclick='doItemSort(\"realm\", \"" + gearTypes[i] + "\", \"0\");'>Realm</th>");
			for (var j = 0; j < gearStats.length; j++) {
				$(row).append("<th class='th statCell' onclick='doItemSort(\"" + gearStats[j] + "\", \"" + gearTypes[i] + "\", \"0\");'>" + gearStats[j] + "</th>");
			}
			$(row).append("<th class='th statCell'>Owned</th>");
			$(tableContainer).append(row);
			
			$(mainContainer).append(tableContainer);
			$("#customTables").append(mainContainer);
		}
	}
	
	for (var key in itemList) {
		if ((ltOwned && arrayContains(ownedItems, key)) || !ltOwned) {
			var itemTypeID = "table-items-" + cleanKey(itemList[key]["type"]);
			var table = $("#" + itemTypeID);
			var combLvl = Math.max((itemList[key]["rarity"] - 1) * 5, 3);
			var levelList = "";
			for (var i = 1; i <= (itemList[key]["rarity"] + 1) * 5; i++) {
				levelList = "<li><a href='javascript:changeComb(\"" + cleanKey(key) + "\", \"" + i + "\")'>" + i + "</a></li>" + levelList;
			}
			if (arrayContains(ownedItems, key)) {
				var index = ownedItems.indexOf(key);
				combLvl = ownedItems[index - 1];
			}
			if (table.attr('id')) {
				if (!limittoChar || (limittoChar && canCharUse(itemList[key]["type"]))) {
					var row = $("<tr onmouseover='javascript:$(\"[id^=" + itemTypeID + "-item-" + cleanKey(key) + "-\").addClass(\"tdHover\");$(\"#" + itemTypeID + "-item-" + cleanKey(key) + "-value-name\").removeClass(\"tdHover\").addClass(\"thHover\");$(\"#" + itemTypeID + "-item-" + cleanKey(key) + "-value-effect\").removeClass(\"tdHover\").addClass(\"thHover\");' onmouseout='javascript:$(\"[id^=" + itemTypeID + "-item-" + cleanKey(key) + "\").removeClass(\"tdHover\").removeClass(\"thHover\");'></tr>");
					$(table).append(row);
					$(row).append("<td id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-name' class='th itemCell' onclick='javascript:doSelect(\"" + cleanKey(key) + "\")'><img class='item-xs-left' src='images/items/" + cleanKey(key) + ".png'></img> " + key + "</td>");
					if (itemList[key]["type"] == "Accessory") {
						$(row).append("<td id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-comb-level' class='td statCell'>1</td>");
					}
					else {
						$(row).append("<td id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-comb' class='td statCell'>" +
							"<span class='dropdown'>" +
								"<a class='glyphicon glyphicon-menu-right' onclick='clickComb(\"" + cleanKey(key) + "\");'></a> <a href='#' class='dropdown-toggle' data-toggle='dropdown' id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-comb-level'>" + combLvl + "<b class='caret'></b></a>" +
								"<ul class='dropdown-menu scrollable-menu'>" +
									levelList +
								"</ul>" +
							"</span></td>");
					}
					$(row).append("<td id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-rarity' class='td statCell' onclick='javascript:doSelect(\"" + cleanKey(key) + "\")'>" + itemList[key]["rarity"] + "</td>");
					$(row).append("<td id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-realm' class='td statCell' onclick='javascript:doSelect(\"" + cleanKey(key) + "\")'>" + itemList[key]["realm"] + "</td>");
					for (var j = 0; j < gearStats.length; j++) {
						$(row).append("<td id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-" + gearStats[j] + "' class='td statCell' onclick='javascript:doSelect(\"" + cleanKey(key) + "\")'>" + doCombinedCalc(key, gearStats[j], "type") + "</td>");
					}
					if (!arrayContains(ownedItems, key))
						$(row).append("<td id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-owned' class='td statCell' onclick='addtoOwned(\"" + cleanKey(key) + "\");'><img id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-owned-img' class='item-xs-left' src='images/style/menuCheckboxIndicator.png'></img></td>");
					else
						$(row).append("<td id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-owned' class='td statCell' onclick='addtoOwned(\"" + cleanKey(key) + "\");'><img id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-owned-img' class='item-xs-left' src='images/style/menuCheckboxIndicatorChecked.png'></img></td>");
					$(table).append(row);
					if (itemList[key]["effect"]) {
						var row = $("<tr></tr>");
						$(row).append("<td colspan='16' id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-effect' class='th statCell'>" + itemList[key]["effect"] + "</td>");
						$(table).append(row);
					}
				}
			}
		}
	}
	/*
	
	$('.collapse.item').on('shown.bs.collapse', function(event){
		var glyphicon = $(this).prev().find(".glyphicon")[0];
		$(glyphicon).removeClass('glyphicon-plus-sign');
		$(glyphicon).addClass('glyphicon-minus-sign');
		});
	$('.collapse.item').on('hidden.bs.collapse', function(event){
		var glyphicon = $(this).prev().find(".glyphicon")[0];
		$(glyphicon).removeClass('glyphicon-minus-sign');
		$(glyphicon).addClass('glyphicon-plus-sign');
	});*/
}

function listItemsBySlot(limittoChar) {
	limitit = limittoChar;
	clearTables();
	document.getElementById("News").style.display = "none";
	document.getElementById("sidebar").style.display = "";
	document.getElementById("characterContainer").style.display = "";
	var mainContainer = $("<div class='mainTable col-xs-14 row'></div>");
	
	//create tables and headers
	for (var i = 0; i < slotNames.length; i++) {
		var itemTypeID = "table-items-" + cleanKey(slotNames[i]);
		var tableContainer = $("<table class='table table-bordered table-responsive' id=" + itemTypeID +"></table>");
		$(tableContainer).append("<thead><tr data-toggle='collapse' data-target='#" + itemTypeID + "-accordion' class='clickable'><td colspan='16' class='thd statCell'>" + slotNames[i] + "</td></tr></thead>");
		$(tableContainer).append("<tbody id='" + itemTypeID + "-accordion' class='collapse'></tbody>");
		
		var row = $("<tr></tr>");
		$(row).append("<th class='th statCell' onclick='doItemSort(\"name\", \"" + slotNames[i] + "\", \"1\");'>Name</th>");
		$(row).append("<th class='th statCell' onclick='doItemSort(\"comb\", \"" + slotNames[i] + "\", \"0\");'>Level</th>");
		$(row).append("<th class='th statCell' onclick='doItemSort(\"rarity\", \"" + slotNames[i] + "\", \"0\");'>Rarity</th>");
		$(row).append("<th class='th statCell' onclick='doItemSort(\"realm\", \"" + slotNames[i] + "\", \"0\");'>Realm</th>");
		for (var j = 0; j < gearStats.length; j++) {
			$(row).append("<th class='th statCell' onclick='doItemSort(\"" + gearStats[j] + "\", \"" + slotNames[i] + "\", \"0\");'>" + gearStats[j] + "</th>");
		}
		$(row).append("<th class='th statCell'>Owned</th>");
		$(tableContainer).append(row);
		
		$(mainContainer).append(tableContainer);
		$("#customTables").append(mainContainer);
	}
	
	for (var key in itemList) {
		if ((ltOwned && arrayContains(ownedItems, key)) || !ltOwned) {
			if (arrayContains(weaponTypes, itemList[key]["type"]))
				slot = "Weapons";
			else if (arrayContains(armorTypes, itemList[key]["type"]))
				slot = "Armors";
			else if (itemList[key]["type"] == "Accessory")
				slot = "Accessories";
			var itemTypeID = "table-items-" + slot;
			var table = $("#" + itemTypeID);
			var combLvl = Math.max((itemList[key]["rarity"] - 1) * 5, 3);
			var levelList = "";
			for (var i = 1; i <= (itemList[key]["rarity"] + 1) * 5; i++) {
				levelList = "<li><a href='javascript:changeComb(\"" + cleanKey(key) + "\", \"" + i + "\")'>" + i + "</a></li>" + levelList;
			}
			if (arrayContains(ownedItems, key)) {
				var index = ownedItems.indexOf(key);
				combLvl = ownedItems[index - 1];
			}
			if (table.attr('id')) {
				if (!limittoChar || (limittoChar && canCharUse(itemList[key]["type"]))) {
					var row = $("<tr onmouseover='javascript:$(\"[id^=" + itemTypeID + "-item-" + cleanKey(key) + "-\").addClass(\"tdHover\");$(\"#" + itemTypeID + "-item-" + cleanKey(key) + "-value-name\").removeClass(\"tdHover\").addClass(\"thHover\");$(\"#" + itemTypeID + "-item-" + cleanKey(key) + "-value-effect\").removeClass(\"tdHover\").addClass(\"thHover\");' onmouseout='javascript:$(\"[id^=" + itemTypeID + "-item-" + cleanKey(key) + "\").removeClass(\"tdHover\").removeClass(\"thHover\");'></tr>");
					$(table).append(row);
					$(row).append("<td id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-name' class='th itemCell' onclick='javascript:doSelect(\"" + cleanKey(key) + "\")'><img class='item-xs-left' src='images/items/" + cleanKey(key) + ".png'></img> " + key + "</td>");
					if (itemList[key]["type"] == "Accessory") {
						$(row).append("<td id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-comb-level' class='td statCell'>1</td>");
					}
					else {
						$(row).append("<td id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-comb' class='td statCell'>" +
							"<span class='dropdown'>" +
								"<a class='glyphicon glyphicon-menu-right' onclick='clickComb(\"" + cleanKey(key) + "\");'></a> <a href='#' class='dropdown-toggle' data-toggle='dropdown' id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-comb-level'>" + combLvl + "<b class='caret'></b></a>" +
								"<ul class='dropdown-menu scrollable-menu'>" +
									levelList +
								"</ul>" +
							"</span></td>");
					}
					$(row).append("<td id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-rarity' class='td statCell' onclick='javascript:doSelect(\"" + cleanKey(key) + "\")'>" + itemList[key]["rarity"] + "</td>");
					$(row).append("<td id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-realm' class='td statCell' onclick='javascript:doSelect(\"" + cleanKey(key) + "\")'>" + itemList[key]["realm"] + "</td>");
					for (var j = 0; j < gearStats.length; j++) {
						$(row).append("<td id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-" + gearStats[j] + "' class='td statCell' onclick='javascript:doSelect(\"" + cleanKey(key) + "\")'>" + doCombinedCalc(key, gearStats[j], "slot") + "</td>");
					}
					if (!arrayContains(ownedItems, key))
						$(row).append("<td id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-owned' class='td statCell' onclick='addtoOwned(\"" + cleanKey(key) + "\");'><img id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-owned-img' class='item-xs-left' src='images/style/menuCheckboxIndicator.png'></img></td>");
					else
						$(row).append("<td id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-owned' class='td statCell' onclick='addtoOwned(\"" + cleanKey(key) + "\");'><img id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-owned-img' class='item-xs-left' src='images/style/menuCheckboxIndicatorChecked.png'></img></td>");
					$(table).append(row);
					if (itemList[key]["effect"]) {
						var row = $("<tr></tr>");
						$(row).append("<td colspan='16' id='" + itemTypeID + "-item-" + cleanKey(key) + "-value-effect' class='th statCell'>" + itemList[key]["effect"] + "</td>");
						$(table).append(row);
					}
				}
			}
		}
	}
	/*
	$('.collapse.item').on('shown.bs.collapse', function(event){
		var glyphicon = $(this).prev().find(".glyphicon")[0];
		$(glyphicon).removeClass('glyphicon-plus-sign');
		$(glyphicon).addClass('glyphicon-minus-sign');
		});
	$('.collapse.item').on('hidden.bs.collapse', function(event){
		var glyphicon = $(this).prev().find(".glyphicon")[0];
		$(glyphicon).removeClass('glyphicon-minus-sign');
		$(glyphicon).addClass('glyphicon-plus-sign');
	});*/
}

function doColoring(itemName) {
	itemName = cleanKey(itemName);
	var $colorize = $("[id*='-item-" + itemName + "-']");
	$colorize.addClass("synergyHi");
}

function doItemSort(column, itemType, isText) {
	itemType = cleanKey(itemType);
	var items = $("[id^=table-][id*=-" + itemType + "-][id$=-value-" + column + "]");
	log($(items).attr('id'));
	var parent = $("[id^=table-][id$=-" + itemType + "]");
	log($(parent).attr('id'));
	
	items.sort(function(a,b) {
		var an = a.textContent,
			bn = b.textContent;
		
		if (column == "comb") {
			var idA = $(a).attr('id') + "-level";
			var idB = $(b).attr('id') + "-level";
			an = $("#" + idA).text();
			bn = $("#" + idB).text();
		}
		
		if (parseInt(isText) == 0) {
			an = parseFloat(convertNumerals(an));
			bn = parseFloat(convertNumerals(bn));
		}
			
		if (isNaN(an) && parseInt(isText) == 0) {
			an = -1;
		}
		if (isNaN(bn) && parseInt(isText) == 0) {
			bn = -1;
		}

		if (an > bn) {
			return parseInt(isText) ? 1 : -1;
		}
		if (an < bn) {
			return parseInt(isText) ? -1 : 1;
		}
		return 0;
	});
	items.each(function() {
		var name = $(this).attr('id').split('-')[$(this).attr('id').split('-').length - 3];
		item = $("[id*=-" + itemType + "-][id*=-" + name + "-]");
		item.each(function() {
			var col = $(this).attr('id').split('-')[$(item).attr('id').split('-').length - 1];
			if (col == column)
				$(this).addClass("sortedHi");
			else
				$(this).removeClass("sortedHi");
		});
		item = $("[id*=-" + itemType + "-][id$=-" + name + "-value-name]");
		$(item).parent().detach().appendTo(parent);
		item = $("[id*=-" + itemType + "-][id$=-" + name + "-value-effect]");
		if (item.attr('id'))
			$(item).parent().detach().appendTo(parent);
	});
}

function clickComb(name) {
	var itemRow = $("[id$=-" + name + "-value-comb-level]");
	var namePart = $(itemRow).attr('id').split('-')[2];
	var cleaned = name;
	name = dirtyKey(name);
	var listType;
	if (namePart == "Weapons" || namePart == "Armors" || namePart == "Accessories")
		listType = "slot";
	else
		listType = "type";
	var cL = $(itemRow).text();
	if (itemList[name]["rarity"] == 1) {
		if (cL < 3) 
			$(itemRow).text(3).append("<b class='caret'></b>");
		else if (cL < 5) 
			$(itemRow).text(5).append("<b class='caret'></b>");
		else if (cL < 10) 
			$(itemRow).text(10).append("<b class='caret'></b>");
		else
			$(itemRow).text(1).append("<b class='caret'></b>");
	}
	else if (itemList[name]["rarity"] == 2) {
		if (cL < 5) 
			$(itemRow).text(5).append("<b class='caret'></b>");
		else if (cL < 10) 
			$(itemRow).text(10).append("<b class='caret'></b>");
		else if (cL < 15) 
			$(itemRow).text(15).append("<b class='caret'></b>");
		else
			$(itemRow).text(1).append("<b class='caret'></b>");
	}
	else if (itemList[name]["rarity"] == 3) {
		if (cL < 10) 
			$(itemRow).text(10).append("<b class='caret'></b>");
		else if (cL < 15) 
			$(itemRow).text(15).append("<b class='caret'></b>");
		else if (cL < 20) 
			$(itemRow).text(20).append("<b class='caret'></b>");
		else
			$(itemRow).text(1).append("<b class='caret'></b>");
	}
	else if (itemList[name]["rarity"] == 4) {
		if (cL < 15) 
			$(itemRow).text(15).append("<b class='caret'></b>");
		else if (cL < 20) 
			$(itemRow).text(20).append("<b class='caret'></b>");
		else if (cL < 25) 
			$(itemRow).text(25).append("<b class='caret'></b>");
		else
			$(itemRow).text(1).append("<b class='caret'></b>");
	}
	else if (itemList[name]["rarity"] == 5) {
		if (cL < 20) 
			$(itemRow).text(20).append("<b class='caret'></b>");
		else if (cL < 25) 
			$(itemRow).text(25).append("<b class='caret'></b>");
		else if (cL < 30) 
			$(itemRow).text(30).append("<b class='caret'></b>");
		else
			$(itemRow).text(1).append("<b class='caret'></b>");
	}
	for (var i = 0; i < gearStats.length; i++) {
		$("#table-items-" + namePart + "-item-" + cleaned + "-value-" + gearStats[i]).text(doCombinedCalc(name, gearStats[i], listType));
	}
	if (arrayContains(ownedItems, name)) {
		var index = ownedItems.indexOf(name);
		ownedItems.splice(index - 1, 2);
		addtoOwned(name);
	}
	doSelectStats();
}

function changeComb(name, level) {
	var itemRow = $("[id$=-" + name + "-value-comb-level]");
	$(itemRow).text(level).append("<b class='caret'></b>");
	var namePart = $(itemRow).attr('id').split('-')[2];
	var cleaned = name;
	name = dirtyKey(name);
	var listType;
	if (namePart == "Weapons" || namePart == "Armors" || namePart == "Accessories")
		listType = "slot";
	else
		listType = "type";
	
	for (var i = 0; i < gearStats.length; i++) {
		$("#table-items-" + namePart + "-item-" + cleaned + "-value-" + gearStats[i]).text(doCombinedCalc(name, gearStats[i], listType));
	}
	if (arrayContains(ownedItems, name)) {
		var index = ownedItems.indexOf(name);
		ownedItems.splice(index - 1, 2);
		addtoOwned(name);
	}
	doSelectStats();
}

function addtoOwned(name) {
	name = dirtyKey(name);
	var cleaned = cleanKey(name);
	var namePart;
	if ($("#table-items-Weapons").attr('id')) {
		if (arrayContains(weaponTypes, itemList[name]["type"]))
			namePart = "Weapons";
		else if (arrayContains(armorTypes, itemList[name]["type"]))
			namePart = "Armors";
		else if (itemList[name]["type"] == "Accessory")
			namePart = "Accessories";
	}
	else if ($("[id^=table-items]").attr('id')) {
		namePart = cleanKey(itemList[name]["type"]);
	}
	log(namePart);
	var comb = document.getElementById("table-items-" + namePart + "-item-" + cleaned + "-value-comb-level").textContent;
	if (!arrayContains(ownedItems, name)) {
		arrayAdd(ownedItems, parseInt(comb));
		arrayAdd(ownedItems, name);
		document.getElementById("table-items-" + namePart + "-item-" + cleaned + "-value-owned-img").src = "images/style/menuCheckboxIndicatorChecked.png";
	}
	else {
		var index = ownedItems.indexOf(name);
		ownedItems.splice(index - 1, 2);
		document.getElementById("table-items-" + namePart + "-item-" + cleaned + "-value-owned-img").src = "images/style/menuCheckboxIndicator.png";
	}
	if (loggedUser)
		updateInventory();
}

function canEquip(charName, itemType) {
	if (arrayContains(charList[charName]["useWeapons"], itemType)) {
		return 1;
	}
	else if (arrayContains(charList[charName]["useArmor"], itemType)) {
		return 1;
	}
	else if (itemType == "Accessory") {
		return 1;
	}
	return 0;
}

function doCombinedCalc(itemName, statName, listType) {
	var attributeValue = 0;
	var attPerLevel = 0;
	var maxLevel = 0;
	var combLvl = 0;
	var synLvl = 0;
	
	if (listType == "type")
		namePart = cleanKey(itemList[itemName]["type"]);
	else if (listType = "slot") {
		if (arrayContains(weaponTypes, itemList[itemName]["type"]))
			namePart = "Weapons";
		else if (arrayContains(armorTypes, itemList[itemName]["type"]))
			namePart = "Armors";
		else if (itemList[itemName]["type"] == "Accessory")
			namePart = "Accessories";
	}
	
	itemName = dirtyKey(itemName);
	var cleaned = cleanKey(itemName);
	
	var comb = $("#table-items-" + namePart + "-item-" + cleaned + "-value-comb-level").text();
	var realm = $("#table-items-" + namePart + "-item-" + cleaned + "-value-realm").text();
	
	maxLevel = parseInt(comb);
	
	attributeValue = itemList[itemName]["baseStats"][statName];
	attPerLevel = (itemList[itemName]["maxStats"][statName] - itemList[itemName]["baseStats"][statName]) / (((itemList[itemName]["rarity"] + 1) * 5) - 1);
	
	if (maxLevel < 5)
		synLvl = 15;
	else if (maxLevel >= 5 && maxLevel < 10)
		synLvl = 20;
	else if (maxLevel >= 10 && maxLevel < 15)
		synLvl = 30;
	else if (maxLevel >= 15 && maxLevel < 20)
		synLvl = 40;
	else if (maxLevel >= 20 && maxLevel < 25)
		synLvl = 50;
	else if (maxLevel >= 25 && maxLevel < 30)
		synLvl = 60;
	else if (maxLevel >= 30)
		synLvl = 70;
	
	attributeValue = attributeValue + (attPerLevel * (maxLevel - 1));
	if (itemList[itemName]["realm"] == selectedRealm) {
		doColoring(itemName);
		attributeValue = attributeValue + (attPerLevel * synLvl);
		
		if (itemList[itemName]["type"] == "Accessory")
			attributeValue += attributeValue / 2;
	}
	
	return Math.ceil(attributeValue);
}

function doSelect(itemName) {
	itemName = dirtyKey(itemName);
	var cleaned = cleanKey(itemName);
	
	if ($("#table-items-Dagger").attr('id')) {
		var itemType = itemList[itemName]["type"];
	}
	else if (arrayContains(weaponTypes, itemList[itemName]["type"]))
		var itemType = "Weapons";
	else if (arrayContains(armorTypes, itemList[itemName]["type"]))
		var itemType = "Armors";
	else if (itemList[itemName]["type"] == "Accessory")
		var itemType = "Accessories";
	
	var toggle = 0;
	if ($("#table-items-" + cleanKey(itemType) + "-item-" + cleaned + "-value-name").hasClass("thSelected"))
		toggle = 1;
	if (arrayContains(weaponTypes, itemType)) {
		for (var i = 0; i < weaponTypes.length; i++) {
			var $deColor = $("[id^='table-items-" + cleanKey(weaponTypes[i]).trim() + "']");
			$deColor.removeClass("tdSelected").removeClass("thSelected");
		}
	}
	else if (arrayContains(armorTypes, itemType)) {
		for (var i = 0; i < armorTypes.length; i++) {
			var $deColor = $("[id^='table-items-" + cleanKey(armorTypes[i]).trim() + "']");
			$deColor.removeClass("tdSelected").removeClass("thSelected");
		}
	}
	else if (itemType == "Accessory") {
		var $deColor = $("[id^='table-items-Accessory']");
		$deColor.removeClass("tdSelected").removeClass("thSelected");
	}
	else if (itemType == "Weapons") {
		var $deColor = $("[id^='table-items-Weapons']");
		$deColor.removeClass("tdSelected").removeClass("thSelected");
	}
	else if (itemType == "Armors") {
		var $deColor = $("[id^='table-items-Armors']");
		$deColor.removeClass("tdSelected").removeClass("thSelected");
	}
	else if (itemType == "Accessories") {
		var $deColor = $("[id^='table-items-Accessories']");
		$deColor.removeClass("tdSelected").removeClass("thSelected");
	}
	if (!toggle) {
		var $colorize = $("[id*='-item-" + cleaned + "-']");
		$colorize.addClass("tdSelected");
		$colorize = $("#table-items-" + cleanKey(itemType) + "-item-" + cleaned + "-value-name");
		$colorize.removeClass("tdSelected").removeClass("tdSelected").addClass("thSelected");
		$colorize = $("#table-items-" + cleanKey(itemType) + "-item-" + cleaned + "-value-effect");
		$colorize.removeClass("tdSelected").removeClass("tdSelected").addClass("thSelected");
	}
	doSelectStats();
}

function toggleItemTablesLimit() {
	if ($("#table-items-Weapons").attr('id')) {
		listItemsBySlot(limitit);
	doSelectStats();
	}
	else if ($("[id^=table-items]").attr('id')) {
		listItemsByType(limitit);
	doSelectStats();
	}
}

function resetItemTables() {
	if ($("#table-items-Weapons").attr('id')) {
		$('.synergyHi').removeClass('synergyHi');
		for (var i = 0; i < gearStats.length; i++) {
			var el = $("[id$='-value-" + gearStats[i] + "']");
			el.each(function() {
				var id = $(this).attr('id');
				var name = dirtyKey(id.split('-')[4]);
				if (itemList[name]) {
					//if (itemList[name]["realm"] == selectedRealm)
						$(this).text(doCombinedCalc(name, gearStats[i], "slot"));
				}
			});
		}
	}
	else if ($("[id^=table-items]").attr('id')) {
		$('.synergyHi').removeClass('synergyHi');
		for (var i = 0; i < gearStats.length; i++) {
			var el = $("[id$='-value-" + gearStats[i] + "']");
			el.each(function() {
				var id = $(this).attr('id');
				var name = dirtyKey(id.split('-')[4]);
				if (itemList[name]) {
					//if (itemList[name]["realm"] == selectedRealm)
						$(this).text(doCombinedCalc(name, gearStats[i], "type"));
				}
			});
		}
	}
}

function toggleLimit() {
	if (ltOwned) {
		ltOwned = 0;
		$("#limitButton").text("Show Owned");
	}
	else {
		ltOwned = 1;
		$("#limitButton").text("Show All");
	}
	toggleItemTablesLimit();
}

//ability functions
function listAbilities(limittoChar) {
	limitit = limittoChar;
	$('body,html').addClass('fixWidth');
	clearTables();
	document.getElementById("News").style.display = "none";
	document.getElementById("sidebar").style.display = "none";
	
	var mainContainer = $("<div id='abilities-test' class='mainTable col-xs-14 row'></div>");
	
	for (var i = 0; i < charSkills.length; i++) {
		if (!limittoChar || (limittoChar && canCharUse(charSkills[i]))) {
			var abilityTypeID = "table-abilities-" + cleanKey(charSkills[i]);
			var tableContainer = $("<table class='table table-bordered table-responsive' id=" + abilityTypeID +"></table>");
			$(mainContainer).append(tableContainer);
			$(tableContainer).append("<thead><tr data-toggle='collapse' data-target='#" + abilityTypeID + "-accordion' class='clickable'><td colspan='16' class='thd statCell'>" + charSkills[i] + "</td></tr></thead>");
			$(tableContainer).append("<tbody id='" + abilityTypeID + "-accordion' class='collapse'></tbody>");
			
			var row = $("<tr></tr>");
			$(row).append("<td id='" + abilityTypeID + "-name' colSpan='3' class='th itemCell' onclick='doItemSort(\"name\", \"" + charSkills[i] + "\", \"1\");'>Name</td>");
			if (charSkills[i] == "Soul Break")
				$(row).append("<td id='" + abilityTypeID + "-rarity' colSpan='1' class='th statCell' onclick='doItemSort(\"rarity\", \"" + charSkills[i] + "\", \"1\");'>Rarity</td>");
			else
				$(row).append("<td id='" + abilityTypeID + "-rarity' colSpan='1' class='th statCell' onclick='doItemSort(\"rarity\", \"" + charSkills[i] + "\", \"0\");'>Rarity</td>");
			$(row).append("<td id='" + abilityTypeID + "-potency' colSpan='1' class='th statCell' onclick='doItemSort(\"potency\", \"" + charSkills[i] + "\", \"0\");'>Potency</td>");
			$(row).append("<td id='" + abilityTypeID + "-cast' colSpan='1' class='th statCell' onclick='doItemSort(\"cast\", \"" + charSkills[i] + "\", \"0\");'>Cast</td>");
			$(row).append("<td id='" + abilityTypeID + "-type' colSpan='2' class='th statCell' onclick='doItemSort(\"type\", \"" + charSkills[i] + "\", \"0\");'>Type</td>");
			$(row).append("<td id='" + abilityTypeID + "-element' colSpan='2' class='th statCell' onclick='doItemSort(\"element\", \"" + charSkills[i] + "\", \"1\");'>Element</td>");
			$(row).append("<td id='" + abilityTypeID + "-effect' colSpan='3' class='th statCell' onclick='doItemSort(\"effect\", \"" + charSkills[i] + "\", \"1\");'>Effect</td>");
			$(row).append("<td id='" + abilityTypeID + "-rate' colSpan='1' class='th statCell' onclick='doItemSort(\"rate\", \"" + charSkills[i] + "\", \"0\");'>Rate</td>");
			$(row).append("<td id='" + abilityTypeID + "-duration' colSpan='1' class='th statCell' onclick='doItemSort(\"duration\", \"" + charSkills[i] + "\", \"0\");'>Secs</td>");
			$(row).append("<td id='" + abilityTypeID + "-SA' colSpan='1' class='th statCell' onclick='doItemSort(\"SA\", \"" + charSkills[i] + "\", \"0\");'>Status ID</td>");
		}
		$(tableContainer).append(row);
	}
	$(mainContainer).append(tableContainer);
	$("#customTables").append(mainContainer);
	
	for (var key in abilityList) {
		var itemContainer = $("#table-abilities-" + cleanKey(abilityList[key]["type"]) + "");
		var row = $("<tr></tr>");
		$(itemContainer).append(row);
		if (itemContainer.attr('id') && (!limittoChar || abilityList[key]["rarity"] <= charList[selectedChar]["useAbility"][abilityList[key]["type"]])) {
			var abilityTypeID = "table-abilities-" + cleanKey(abilityList[key]["type"]);
			if (abilityList[key]["type"] == "Soul Break")
				$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-name' colspan='3' class='th sbCell'><img class='sb-xs-left' src='images/sbs/" + cleanKey(key.split(' (')[0]) + ".png'/>" + key + "</td>");
			else
				$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-name' colspan='3' class='th itemCell'><img class='item-xs-left' src='images/abilities/" + cleanKey(key) + ".png'/>" + key + "</td>");
			$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-rarity' colspan='1' class='td statCell'>" + abilityList[key]["rarity"] + "</td>");
			$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-potency' colspan='1' class='td statCell'>" + abilityList[key]["multiplier"] + "</td>");
			$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-cast' colspan='1' class='td statCell'>" + abilityList[key]["cast"] + "</td>");
			$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-type' colspan='2' class='td statCell'>" + abilityList[key]["type"] + "</td>");
			$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-element' colspan='2' class='td statCell'>" + abilityList[key]["element"] + "</td>");
			$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-effect' colspan='3' class='td statCell'>" + abilityList[key]["effect"] + "</td>");
			$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-rate' colspan='1' class='td statCell'>" + abilityList[key]["effectRate"] + "</td>");
			$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-duration' colspan='1' class='td statCell'>" + abilityList[key]["duration"] + "</td>");
			$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-SA' colspan='1' class='td statCell'>" + abilityList[key]["statusID"] + "</td>");
		}
	}
	
	/*$('.collapse.item').on('shown.bs.collapse', function(event){
		var glyphicon = $(this).prev().find(".glyphicon")[0];
		$(glyphicon).removeClass('glyphicon-plus-sign');
		$(glyphicon).addClass('glyphicon-minus-sign');
		});
	$('.collapse.item').on('hidden.bs.collapse', function(event){
		var glyphicon = $(this).prev().find(".glyphicon")[0];
		$(glyphicon).removeClass('glyphicon-minus-sign');
		$(glyphicon).addClass('glyphicon-plus-sign');
	});*/
}

function listSBs() {
	$('body,html').addClass('fixWidth');
	clearTables();
	document.getElementById("News").style.display = "none";
	document.getElementById("sidebar").style.display = "none";
	
	var mainContainer = $("<div id='abilities-test' class='mainTable col-xs-14 row'></div>");
	
	var abilityTypeID = "table-abilities-" + cleanKey("Soul Break");
	var tableContainer = $("<table class='table table-bordered table-responsive' id=" + abilityTypeID +"></table>");
	$(mainContainer).append(tableContainer);
	$(tableContainer).append("<thead><tr data-toggle='collapse' data-target='#" + abilityTypeID + "-accordion' class='clickable'><td colspan='16' class='thd statCell'>Soul Break</td></tr></thead>");
	$(tableContainer).append("<tbody id='" + abilityTypeID + "-accordion' class='collapse'></tbody>");
	
	var row = $("<tr></tr>");
	$(row).append("<td id='" + abilityTypeID + "-name' colSpan='3' class='th itemCell' onclick='doItemSort(\"name\", \"Soul Break\", \"1\");'>Name</td>");
	$(row).append("<td id='" + abilityTypeID + "-rarity' colSpan='1' class='th statCell' onclick='doItemSort(\"rarity\", \"Soul Break\", \"1\");'>Rarity</td>");
	$(row).append("<td id='" + abilityTypeID + "-potency' colSpan='1' class='th statCell' onclick='doItemSort(\"potency\", \"Soul Break\", \"0\");'>Potency</td>");
	$(row).append("<td id='" + abilityTypeID + "-cast' colSpan='1' class='th statCell' onclick='doItemSort(\"cast\", \"Soul Break\", \"0\");'>Cast</td>");
	$(row).append("<td id='" + abilityTypeID + "-type' colSpan='2' class='th statCell' onclick='doItemSort(\"type\", \"Soul Break\", \"0\");'>Type</td>");
	$(row).append("<td id='" + abilityTypeID + "-element' colSpan='2' class='th statCell' onclick='doItemSort(\"element\", \"Soul Break\", \"1\");'>Element</td>");
	$(row).append("<td id='" + abilityTypeID + "-effect' colSpan='3' class='th statCell' onclick='doItemSort(\"effect\", \"Soul Break\", \"1\");'>Effect</td>");
	$(row).append("<td id='" + abilityTypeID + "-rate' colSpan='1' class='th statCell' onclick='doItemSort(\"rate\", \"Soul Break\", \"0\");'>Rate</td>");
	$(row).append("<td id='" + abilityTypeID + "-duration' colSpan='1' class='th statCell' onclick='doItemSort(\"duration\", \"Soul Break\", \"0\");'>Secs</td>");
	$(row).append("<td id='" + abilityTypeID + "-SA' colSpan='1' class='th statCell' onclick='doItemSort(\"SA\", \"Soul Break\", \"0\");'>Status ID</td>");
	$(tableContainer).append(row);
	$(mainContainer).append(tableContainer);
	$("#customTables").append(mainContainer);
	
	for (var key in abilityList) {
		var itemContainer = $("#table-abilities-" + cleanKey("Soul Break"));
		var row = $("<tr></tr>");
		$(itemContainer).append(row);
		if (abilityList[key]["type"] == "Soul Break") {
			var abilityTypeID = "table-abilities-" + cleanKey("Soul Break");
			$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-name' colspan='3' class='th sbCell'><img class='sb-xs-left' src='images/sbs/" + cleanKey(key.split(' (')[0]) + ".png'/>" + key + "</td>");
			$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-rarity' colspan='1' class='td statCell'>" + abilityList[key]["rarity"] + "</td>");
			$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-potency' colspan='1' class='td statCell'>" + abilityList[key]["multiplier"] + "</td>");
			$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-cast' colspan='1' class='td statCell'>" + abilityList[key]["cast"] + "</td>");
			$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-type' colspan='2' class='td statCell'>" + abilityList[key]["type"] + "</td>");
			$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-element' colspan='2' class='td statCell'>" + abilityList[key]["element"] + "</td>");
			$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-effect' colspan='3' class='td statCell'>" + abilityList[key]["effect"] + "</td>");
			$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-rate' colspan='1' class='td statCell'>" + abilityList[key]["effectRate"] + "</td>");
			$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-duration' colspan='1' class='td statCell'>" + abilityList[key]["duration"] + "</td>");
			$(row).append("<td id='" + abilityTypeID + "-ability-" + cleanKey(key) + "-value-SA' colspan='1' class='td statCell'>" + abilityList[key]["statusID"] + "</td>");
		}
	}
}

//dungeon functions
function popDunByRealm(dunType) {	
	clearTables();
	document.getElementById("News").style.display = "none";
	document.getElementById("sidebar").style.display = "none";
	var mainContainer = $("<div' class='mainTable col-xs-15 row'></div>");
	$("#customTables").append(mainContainer);
	
	if (dunType == "Classic") {
		var container = $("<ul class='nav nav-pills'></ul>");
		for (var i = 0; i < allRealms.length; i++) {
			$(container).append("<li id='classic-" + allRealms[i] + "' class='col-xs-1' role='presentation' onclick='javascript:toggleActive(\"classic\", \"" + allRealms[i] + "\")\;listDungeons(\"Classic\")'>" + allRealms[i] + "</li>");
		}
		$(mainContainer).append(container);
	}
	else if (dunType == "Elite") {
		var container = $("<ul class='nav nav-pills'></ul>");
		for (var i = 0; i < allRealms.length; i++) {
			$(container).append("<li id='elite-" + allRealms[i] + "' class='col-xs-1' role='presentation' onclick='javascript:toggleActive(\"elite\", \"" + allRealms[i] + "\")\;listDungeons(\"Elite\")'>" + allRealms[i] + "</li>");
		}
		$(mainContainer).append(container);
	}
	else if (dunType == "Weekly") {
		var container = $("<ul class='nav nav-pills'></ul>");
		for (var i = 0; i < weekRealms.length; i++) {
			$(container).append("<li id='weekly-" + weekRealms[i] + "' class='col-xs-1' role='presentation' onclick='javascript:toggleActive(\"weekly\", \"" + weekRealms[i] + "\")\;listDungeons(\"Weekly\")'>" + weekRealms[i] + "</li>");
		}
		$(mainContainer).append(container);
	}
	else if (dunType == "Challenge") {
		//create dropdown with Challenge events sorted by release date
		var container = $("<div class='dropdown'><button class='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown'>Challenge Events<span class='caret'></span></button></div>");
		var conList = $("<ul class='dropdown-menu'></ul>");
		var chList = [];
		$.each(eventList, function(a) {
			if (eventList[a].Type == "Challenge")
				if ($.inArray(a.split('[')[1].replace(']', ''), chList) == -1)
					chList.push(a.split('[')[1].replace(']', ''));
		});
		$.each(chList, function(a) {
			$(conList).append("<li><a href='javascript:listDungeons(\"" + cleanKey(chList[a]) + "\")'>" + chList[a] + "</a></li>");
		});
		$(container).append(conList);
		$(mainContainer).append(container);
	}
	else if (dunType == "Survival") {
		//create dropdown with Survival events sorted by release date
		var container = $("<div class='dropdown'><button class='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown'>Survival Events<span class='caret'></span></button></div>");
		var conList = $("<ul class='dropdown-menu'></ul>");
		var chList = [];
		$.each(eventList, function(a) {
			if (eventList[a].Type == "Survival")
				if ($.inArray(a.split('[')[1].replace(']', ''), chList) == -1)
					chList.push(a.split('[')[1].replace(']', ''));
		});
		$.each(chList, function(a) {
			$(conList).append("<li><a href='javascript:listDungeons(\"" + cleanKey(chList[a]) + "\")'>" + chList[a] + "</a></li>");
		});
		$(container).append(conList);
		$(mainContainer).append(container);
	}
	else if (dunType == "Collection") {
		//create dropdown with Collection events sorted by release date
		var container = $("<div class='dropdown'><button class='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown'>Collection Events<span class='caret'></span></button></div>");
		var conList = $("<ul class='dropdown-menu'></ul>");
		var chList = [];
		$.each(eventList, function(a) {
			if (eventList[a].Type == "Collection")
				if ($.inArray(a.split('[')[1].replace(']', ''), chList) == -1)
					chList.push(a.split('[')[1].replace(']', ''));
		});
		$.each(chList, function(a) {
			$(conList).append("<li><a href='javascript:listDungeons(\"" + cleanKey(chList[a]) + "\")'>" + chList[a] + "</a></li>");
		});
		$(container).append(conList);
		$(mainContainer).append(container);
	}
	else {
		listDungeons(dunType);
	}
}

function toggleActive(dunType, dunRealm) {
	if ($("#" + dunType + "-" + dunRealm).hasClass('active')) {
		$("[id^=" + dunType + "-]").removeClass('active');
	}
	else {
		$("[id^=" + dunType + "-]").removeClass('active');
		$("#" + dunType + "-" + dunRealm).addClass('active');
	}
}

function listDungeons(dunType) {
	dunType = dirtyKey(dunType);
	$(".table").remove();
	switch(dunType) {
		case "Classic": dunList = dungeonList; break;
		case "Elite": dunList = eliteList; break;
		case "Weekly": dunList = weeklyList; break;
		default: dunList = eventList; 
	}
	
	if ($('.active').attr('id'))
		var dunRealm = $('.active').attr('id').split('-')[1];
	else
		var dunRealm = dunType;
	log(dunRealm);
	//log(dunType + " " + dunRealm);
	
	for (var key in dunList) {
		if (dunType == "Weekly")
			kRealm = dunList[key]["Day"];
		else
			var kRealm = key.split('[')[1].replace(']', '');
		if (kRealm == dunRealm) {
			var dungeonID = cleanKey(key);
			var tableContainer = $("<table class='table table-bordered table-responsive' id=" + dungeonID +"></table>");
			$("#customTables").append(tableContainer);
			$(tableContainer).append("<thead><tr data-toggle='collapse' data-target='#" + dungeonID + "-accordion' class='clickable' area-expanded='true'><td colspan='16' class='thd dunCell'>" + key + "</td></tr></thead>");
			$(tableContainer).append("<tbody id='" + dungeonID + "-accordion' class='collapse in' aria-expanded='true'></tbody>");
			var row = $("<tr></tr>");
			$(tableContainer).append(row);
			$(row).append("<td colspan='8' rowspan='6' class='dunCell'><img class='dunPic' src='" + dunList[key]["Image"] + "'></img></td>");
			$(row).append("<td colspan='4' class='th dunCell'>Difficulty</td>");
			$(row).append("<td colspan='4' class='td dunCell'>" + dunList[key]["Difficulty"] + "</td>");
			var row = $("<tr></tr>");
			$(tableContainer).append(row);
			$(row).append("<td colspan='4' class='th dunCell'>Stages</td>");
			$(row).append("<td colspan='4' class='td dunCell'>" + dunList[key]["Stages"] + "</td>");
			var row = $("<tr></tr>");
			$(tableContainer).append(row);
			$(row).append("<td colspan='4' class='th dunCell'>Stamina</td>");
			var total = 0;
			$.each(dunList[key]["Required Stamina"], function(i, item){ total += parseInt(item) || 0; });
			$(row).append("<td colspan='4' class='td dunCell'>" + total + "</td>");
			var row = $("<tr></tr>");
			$(tableContainer).append(row);
			$(row).append("<td colspan='4' class='th dunCell'>EXP</td>");
			total = 0;
			$.each(dunList[key]["EXP"], function(i, item){ total += parseInt(item) || 0; });
			$(row).append("<td colspan='4' class='td dunCell'>" + total + "</td>");
			var row = $("<tr></tr>");
			$(tableContainer).append(row);
			$(row).append("<td colspan='4' class='th dunCell'>Stars Req \(Total\)</td>");
			var totStars = dunList[key]["Stages"] * 9;
			for (var key2 in dunList[key]["Bosses"]) {
				if (dunList[key]["Bosses"][key2]["Bonus Condition"])
				totStars = totStars + (dunList[key]["Bosses"][key2]["Bonus Condition"].split(',').length * 3);
			}
			var reqStars = Math.ceil(totStars * .833);
			$(row).append("<td colspan='4' class='td dunCell'>" + reqStars + "</td>");
			var row = $("<tr></tr>");
			$(tableContainer).append(row);
			$(row).append("<td colspan='4' class='th dunCell'>Mastery w\\o Bonus</td>");
			$(row).append("<td colspan='4' class='td dunCell'>" + (dunList[key]["Stages"] * 9 >= reqStars? "Yes" : "No" ) + "</td>");
			var row = $("<tr></tr>");
			$(tableContainer).append(row);
			$(row).append("<td colspan='16' class='th dunCell'>Notes</td>");
			$.each(dunList[key]["Notes"].split("|"), function(i, item){
				var row = $("<tr></tr>");
				$(tableContainer).append(row);
				$(row).append("<td colspan='16' class='td dunCell'>" + (item === "" ? "-" : item) + "</td>");
			});
			$(tableContainer).append("<thead><tr data-toggle='collapse' data-target='#" + dungeonID + "-rewards-accordion' class='clickable'><td colspan='16' class='thd dunCell'>Rewards</td></tr></thead>");
			var rewardContainer = $("<tbody id='" + dungeonID + "-rewards-accordion' class='collapse'></tbody>");
			$(tableContainer).append(rewardContainer);
			$(rewardContainer).append("<tr><td colspan='16' class='th dunCell'>Completion Rewards</td></tr>");
			var item1 = dunList[key]["Completion Reward"].split(', ')[0];
			var isChar = 0;
			var isAbility = 0;
			var isItem = 0;
			for (var key2 in charList) {
				if (item1.split(" x")[0] == key2)
					isChar = 1;
			}
			for (var key2 in itemList) {
				if (item1.split(" x")[0] == key2)
					isItem = 1;
			}
			for (var key2 in abilityList) {
				if (item1.split(" x")[0] == key2)
					isAbility = 1;
			}
			if (isChar)
				$(rewardContainer).append("<tr><td colspan='16' class='td dunCell'>" + item1 + "<img class='item-sm' src='images/characters/" + cleanKey(item1.split(" x")[0]) + ".png'/></td></tr>");
			else if (isItem)
				$(rewardContainer).append("<tr><td colspan='16' class='td dunCell'>" + item1 + "<img class='item-sm' src='images/items/" + cleanKey(item1.split(" x")[0]) + ".png'/></td></tr>");
			else if (isAbility)
				$(rewardContainer).append("<tr><td colspan='16' class='td dunCell'>" + item1 + "<img class='item-sm' src='images/abilities/" + cleanKey(item1.split(" x")[0]) + ".png'/></td></tr>");
			else
				$(rewardContainer).append("<tr><td colspan='16' class='td dunCell'>" + item1 + "<img class='item-sm' src='images/drops/" + cleanKey(item1.split(" x")[0]) + ".png'/></td></tr>");
			
			$(rewardContainer).append("<tr><td colspan='16' class='th dunCell'>First Time Rewards</td></tr>");
			//First Time Reward
			var item1 = dunList[key]["First Time Rewards"].split(', ')[0];
			var item2 = dunList[key]["First Time Rewards"].split(', ')[1];
			var isChar = [0, 0];
			var isAbility = [0, 0];
			var isItem = [0, 0];
			var row = $("<tr></tr>");
			$(rewardContainer).append(row);
			for (var key2 in charList) {
				if (item1.split(" x")[0] == key2)
					isChar[0] = 1;
				if (item2)
					if (item2.split(" x")[0] == key2)
						isChar[1] = 1;
			}
			for (var key2 in itemList) {
				if (item1.split(" x")[0] == key2)
					isItem[0] = 1;
				if (item2)
					if (item2.split(" x")[0] == key2)
					isItem[1] = 1;
			}
			for (var key2 in abilityList) {
				if (item1.split(" x")[0] == key2)
					isAbility[0] = 1;
				if (item2)
					if (item2.split(" x")[0] == key2)
						isAbility[1] = 1;
			}
			if (isChar[0])
				$(row).append("<td colspan='8' class='td dunCell'>" + item1 + "<img class='item-sm' src='images/characters/" + cleanKey(item1.split(" x")[0]) + ".png'/></td>");
			else if (isItem[0])
				$(row).append("<td colspan='8' class='td dunCell'>" + item1 + "<img class='item-sm' src='images/items/" + cleanKey(item1.split(" x")[0]) + ".png'/></td>");
			else if (isAbility[0])
				$(row).append("<td colspan='8' class='td dunCell'>" + item1 + "<img class='item-sm' src='images/abilities/" + cleanKey(item1.split(" x")[0]) + ".png'/></td>");
			else
				$(row).append("<td colspan='8' class='td dunCell'>" + item1 + "<img class='item-sm' src='images/drops/" + cleanKey(item1.split(" x")[0]) + ".png'/></td>");
			if (item2) {
				if (isChar[1])
					$(row).append("<td colspan='8' class='td dunCell'>" + item2 + "<img class='item-sm' src='images/characters/" + cleanKey(item2.split(" x")[0]) + ".png'/></td>");
				else if (isItem[1])
					$(row).append("<td colspan='8' class='td dunCell'>" + item2 + "<img class='item-sm' src='images/items/" + cleanKey(item2.split(" x")[0]) + ".png'/></td>");
				else if (isAbility[1])
					$(row).append("<td colspan='8' class='td dunCell'>" + item2 + "<img class='item-sm' src='images/abilities/" + cleanKey(item2.split(" x")[0]) + ".png'/></td>");
				else
					$(row).append("<td colspan='8' class='td dunCell'>" + item2 + "<img class='item-sm' src='images/drops/" + cleanKey(item2.split(" x")[0]) + ".png'/></td>");
			}
			else 
				$(row).append("<td colspan='8' class='td dunCell'></td>");
			$(rewardContainer).append("<tr><td colspan='16' class='th dunCell'>Mastery Rewards</td></tr>");
			//Mastered
			item1 = dunList[key]["Mastery Reward"].split(', ')[0];
			item2 = dunList[key]["Mastery Reward"].split(', ')[1];
			isChar = [0, 0];
			isAbility = [0, 0];
			isItem = [0, 0];
			var row = $("<tr></tr>");
			$(rewardContainer).append(row);
			for (var key2 in charList) {
				if (item1.split(" x")[0] == key2)
					isChar[0] = 1;
				if (item2)
					if (item2.split(" x")[0] == key2)
					isChar[1] = 1;
			}
			for (var key2 in itemList) {
				if (item1.split(" x")[0] == key2)
					isItem[0] = 1;
				if (item2)
					if (item2.split(" x")[0] == key2)
						isItem[1] = 1;
			}
			for (var key2 in abilityList) {
				if (item1.split(" x")[0] == key2)
					isAbility[0] = 1;
				if (item2)
					if (item2.split(" x")[0] == key2)
						isAbility[1] = 1;
			}
			if (isChar[0])
				$(row).append("<td colspan='8' class='td dunCell'>" + item1 + "<img class='item-sm' src='images/characters/" + cleanKey(item1.split(" x")[0]) + ".png'/></td>");
			else if (isItem[0])
				$(row).append("<td colspan='8' class='td dunCell'>" + item1 + "<img class='item-sm' src='images/items/" + cleanKey(item1.split(" x")[0]) + ".png'/></td>");
			else if (isAbility[0])
				$(row).append("<td colspan='8' class='td dunCell'>" + item1 + "<img class='item-sm' src='images/abilities/" + cleanKey(item1.split(" x")[0]) + ".png'/></td>");
			else
				$(row).append("<td colspan='8' class='td dunCell'>" + item1 + "<img class='item-sm' src='images/drops/" + cleanKey(item1.split(" x")[0]) + ".png'/></td>");
			if (item2) {
				if (isChar[1])
					$(row).append("<td colspan='8' class='td dunCell'>" + item2 + "<img class='item-sm' src='images/characters/" + cleanKey(item2.split(" x")[0]) + ".png'/></td>");
				else if (isItem[1])
					$(row).append("<td colspan='8' class='td dunCell'>" + item2 + "<img class='item-sm' src='images/items/" + cleanKey(item2.split(" x")[0]) + ".png'/></td>");
				else if (isAbility[1])
					$(row).append("<td colspan='8' class='td dunCell'>" + item2 + "<img class='item-sm' src='images/abilities/" + cleanKey(item2.split(" x")[0]) + ".png'/></td>");
				else
					$(row).append("<td colspan='8' class='td dunCell'>" + item2 + "<img class='item-sm' src='images/drops/" + cleanKey(item2.split(" x")[0]) + ".png'/></td>");
			}
			else 
				$(row).append("<td colspan='8' class='td dunCell'></td>");
			
			if (dunList[key]["Bosses"]) {
				$(tableContainer).append("<thead><tr data-toggle='collapse' data-target='#" + dungeonID + "-boss-accordion' class='clickable'><td colspan='16' class='thd dunCell'>Bosses</td></tr></thead>");
				var bossContainer = $("<tbody id='" + dungeonID + "-boss-accordion' class='collapse'></tbody>");
				$(tableContainer).append(bossContainer);
				for (var key2 in dunList[key]["Bosses"]) {
					var bossID = cleanKey(key2);
					var row = $("<tr></tr>");
					$(bossContainer).append(row);
					$(row).append("<td data-toggle='collapse' data-target='#" + bossID + ".bossCollapse' class='clickable dunCell thd' colspan='16'>" + key2 + "</td>");
					var row = $("<tr id='" + bossID + "' class='collapse bossCollapse'></tr>");
					$(bossContainer).append(row);
					$(row).append("<td colspan='16' class='th dunCell'>HP</td>");
					var row = $("<tr id='" + bossID + "' class='collapse bossCollapse'></tr>");
					$(bossContainer).append(row);
					$(row).append("<td colspan='16' class='td dunCell'>" + dunList[key]["Bosses"][key2]["Stats"]["HP"] + "</td>");
					var row = $("<tr id='" + bossID + "' class='collapse bossCollapse'></tr>");
					$(bossContainer).append(row);
					$(row).append("<td colspan='4' class='th dunCell'>ATK</td>");
					$(row).append("<td colspan='3' class='th dunCell'>DEF</td>");
					$(row).append("<td colspan='3' class='th dunCell'>MAG</td>");
					$(row).append("<td colspan='3' class='th dunCell'>RES</td>");
					$(row).append("<td colspan='3' class='th dunCell'>SPD</td>");
					var row = $("<tr id='" + bossID + "' class='collapse bossCollapse'></tr>");
					$(bossContainer).append(row);
					$(row).append("<td colspan='4' class='td dunCell'>" + dunList[key]["Bosses"][key2]["Stats"]["ATK"] + "</td>");
					$(row).append("<td colspan='3' class='td dunCell'>" + dunList[key]["Bosses"][key2]["Stats"]["DEF"] + "</td>");
					$(row).append("<td colspan='3' class='td dunCell'>" + dunList[key]["Bosses"][key2]["Stats"]["MAG"] + "</td>");
					$(row).append("<td colspan='3' class='td dunCell'>" + dunList[key]["Bosses"][key2]["Stats"]["RES"] + "</td>");
					$(row).append("<td colspan='3' class='td dunCell'>" + dunList[key]["Bosses"][key2]["Stats"]["SPD"] + "</td>");
					var row = $("<tr id='" + bossID + "' class='collapse bossCollapse'></tr>");
					$(bossContainer).append(row);
					$(row).append("<td colspan='4' class='th dunCell'>Weak</td>");
					$(row).append("<td colspan='4' class='th dunCell'>Resist</td>");
					$(row).append("<td colspan='4' class='th dunCell'>Null</td>");
					$(row).append("<td colspan='4' class='th dunCell'>Absorb</td>");
					var row = $("<tr id='" + bossID + "' class='collapse bossCollapse'></tr>");
					$(bossContainer).append(row);
					$(row).append("<td colspan='4' class='td dunCell'>" + listElements(dunList[key]["Bosses"][key2]["Elements"]["Weak"]) + "</td>");
					$(row).append("<td colspan='4' class='td dunCell'>" + listElements(dunList[key]["Bosses"][key2]["Elements"]["Resist"]) + "</td>");
					$(row).append("<td colspan='4' class='td dunCell'>" + listElements(dunList[key]["Bosses"][key2]["Elements"]["Null"]) + "</td>");
					$(row).append("<td colspan='4' class='td dunCell'>" + listElements(dunList[key]["Bosses"][key2]["Elements"]["Absorb"]) + "</td>");
					var row = $("<tr id='" + bossID + "' class='collapse bossCollapse'></tr>");
					$(bossContainer).append(row);
					$(row).append("<td colspan='16' class='th dunCell'>Status Vulnerabilities</td>");
					var row = $("<tr id='" + bossID + "' class='collapse bossCollapse'></tr>");
					$(bossContainer).append(row);
					if (dunList[key]["Bosses"][key2]["Status"].length > 2)
						$(row).append("<td colspan='16' class='td dunCell'>" + listElements(dunList[key]["Bosses"][key2]["Status"]) + "</td>");
					else
						$(row).append("<td colspan='16' class='td dunCell'>-</td>");
					var row = $("<tr id='" + bossID + "' class='collapse bossCollapse'></tr>");
					$(bossContainer).append(row);
					$(row).append("<td colspan='8' class='th dunCell'>Resist</td>");
					$(row).append("<td colspan='8' class='th dunCell'>Immune</td>");
					var row = $("<tr id='" + bossID + "' class='collapse bossCollapse'></tr>");
					$(bossContainer).append(row);
					$(row).append("<td colspan='8' class='td dunCell'>" + listElements(dunList[key]["Bosses"][key2]["Breaks"]["Resist"]) + "</td>");
					$(row).append("<td colspan='8' class='td dunCell'>" + listElements(dunList[key]["Bosses"][key2]["Breaks"]["Immune"]) + "</td>");
					var row = $("<tr id='" + bossID + "' class='collapse bossCollapse'></tr>");
					$(bossContainer).append(row);
					$(row).append("<td colspan='16' class='th dunCell'>Bonus Conditions</td>");
					if(dunList[key]["Bosses"][key2]["Bonus Condition"]){
						$.each(dunList[key]["Bosses"][key2]["Bonus Condition"].split(', '), function(x, bonus){
							var row = $("<tr id='" + bossID + "' class='collapse bossCollapse'></tr>");
							$(bossContainer).append(row);
							$(row).append("<td colspan='16' class='td dunCell'>" + bonus + "</td>");
						});
					} 
					else { 
						var row = $("<tr id='" + bossID + "' class='collapse bossCollapse'></tr>");
						$(bossContainer).append(row);
						$(row).append("<td colspan='16' class='td dunCell'>-</td>");
					}
					var row = $("<tr id='" + bossID + "' class='collapse bossCollapse'></tr>");
					$(bossContainer).append(row);
					$(row).append("<td colspan='16' class='th dunCell'>Boss Notes</td>");
					if(dunList[key]["Bosses"][key2]["Notes"]){
						$.each(dunList[key]["Bosses"][key2]["Notes"].split('|'), function(x, note) {
							var row = $("<tr id='" + bossID + "' class='collapse bossCollapse'></tr>");
							$(bossContainer).append(row);
							$(row).append("<td colspan='16' class='td dunCell'>" + note + "</td>");
						});
					} 
					else { 
						var row = $("<tr id='" + bossID + "' class='collapse bossCollapse'></tr>");
						$(bossContainer).append(row);
						$(row).append("<td colspan='16' class='td dunCell'>-</td>");
					}
					var row = $("<tr id='" + bossID + "' class='bossCollapse collapse'></tr>");
					$(bossContainer).append(row);
					$(row).append("<td data-toggle='collapse' data-target='#" + bossID + ".attackCollapse' class='th clickable dunCell' colspan='16'>Attacks</td>");
					var row = $("<tr id='" + bossID + "' class='bossCollapse attackCollapse collapse'></tr>");
					$(bossContainer).append(row);
					$(row).append("<td colspan='4' class='th dunCell'>Name</td>");
					$(row).append("<td colspan='2' class='th dunCell'>Type</td>");
					$(row).append("<td colspan='2' class='th dunCell'>Potency</td>");
					$(row).append("<td colspan='4' class='th dunCell'>Rate</td>");
					$(row).append("<td colspan='4' class='th dunCell'>Effect</td>");
					var count = 0;
					var types = dunList[key]["Bosses"][key2]["Types"].split(',');
					$.each(Object.keys(dunList[key]["Bosses"][key2]["Attacks"]),function(x, attack){
						var row = $("<tr id='" + bossID + "' class='bossCollapse attackCollapse collapse'></tr>");
						$(bossContainer).append(row);
						if (types) {
							if (types[count] == 1) {
								if (dunList[key]["Bosses"][key2]["Attacks"][attack][2] == "Physical")
									var aType = "";
								else
									var aType = "Physical ";
							}
							else if (types[count] == 3)
								var aType = "White Magic ";
							else if (types[count] == 4)
								var aType = "Black Magic ";
							else if (types[count] == 5)
								var aType = "Blue Magic ";
							else if (types[count] == 7)
								var aType = "Inborn ";
						}
						else
							aType = "";
						$(row).append("<td colspan='4' class='td dunCell'>" + attack + "</td>");
						$(row).append("<td colspan='2' class='td dunCell'>" + aType + dunList[key]["Bosses"][key2]["Attacks"][attack][2] + "</td>");
						$(row).append("<td colspan='2' class='td dunCell'>" + dunList[key]["Bosses"][key2]["Attacks"][attack][1] + "</td>");
						$(row).append("<td colspan='4' class='td dunCell'>" + dunList[key]["Bosses"][key2]["Attacks"][attack][0] + "</td>");
						$(row).append("<td colspan='4' class='td dunCell'>" + dunList[key]["Bosses"][key2]["Attacks"][attack][3] + "</td>");
						count++;
					});
				}
			}
		}
	}
}

function cleanKey(key) {
	return key.replace(/\[/g, 'lbracket').replace(/\]/g, 'rbracket').replace(/\%/g, 'percent').replace(/\&/g, 'ampersand').replace(/\+/g, 'plus').replace(/'/g, 'apostrophe').replace(/!/g, 'exclamation').replace(/\?/g, 'question').replace(/ /g, '_').replace(/\(/g, 'lparenthese').replace(/\)/g, 'rparenthese').replace(/,/g, 'comma').replace(/\./g, 'period').replace(/\-/g, 'dash').trim();
}

function dirtyKey(key) {
	return key.replace(/lbracket/g, '[').replace(/rbracket/g, ']').replace(/percent/g, '%').replace(/ampersand/g, '&').replace(/plus/g, '+').replace(/apostrophe/g, '\'').replace(/exclamation/g, '!').replace(/question/g, '?').replace(/_/g, ' ').replace(/lparenthese/g, '(').replace(/rparenthese/g, ')').replace(/comma/g, ',').replace(/period/g, '.').replace(/dash/g, '-').trim();
}

function listElements(element) {
		return (typeof element !== "undefined"? typeof element === "string"? element : element.join(", ") : "-");
}

function dunEXP() {
	$('body,html').removeClass('fixWidth');
	clearTables();
	document.getElementById("News").style.display = "none";
	document.getElementById("sidebar").style.display = "none";
	
	var mainContainer = $("<div id='exp-list' class='mainTable col-xs-14 row'></div>");
	var tableContainer = $("<table class='table table-bordered table-responsive' id='table-EXP-3'></table>");
	$(mainContainer).append(tableContainer);
	$("#customTables").append(mainContainer);
	$(tableContainer).append("<thead></thead>");
	$(tableContainer).append("<tbody></tbody>");
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	$(row).append("<td colspan='16' class='thd statCell'>Best EXP/Stamina</td>");
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	$(row).append("<td colspan='5' class='th statCell' onclick='doEXPSort(\"top\", \"name\", 1)'>Dungeon</td>");
	$(row).append("<td colspan='1' class='th statCell' onclick='doEXPSort(\"top\", \"realm\", 0)'>Realm</td>");
	$(row).append("<td colspan='1' class='th statCell' onclick='doEXPSort(\"top\", \"stage\", 0)'>Stage</td>");
	$(row).append("<td colspan='1' class='th statCell' onclick='doEXPSort(\"top\", \"stam\", 0)'>Stamina</td>");
	$(row).append("<td colspan='2' class='th statCell' onclick='doEXPSort(\"top\", \"exp\", 0)'>EXP/Stamina</td>");
	for (var i = 0; i < 10; i++) {
		var row = $("<tr></tr>");
		$(tableContainer).append(row);
		$(row).append("<td id='exp-list-name-top-" + i + "' colspan='5' class='th statCell'></td>");
		$(row).append("<td id='exp-list-realm-top-" + i + "' colspan='1' class='td statCell'></td>");
		$(row).append("<td id='exp-list-stage-top-" + i + "' colspan='1' class='td statCell'></td>");
		$(row).append("<td id='exp-list-stam-top-" + i + "' colspan='1' class='td statCell'>1</td>");
		$(row).append("<td id='exp-list-exp-top-" + i + "' colspan='2' class='td statCell'>1</td>");
	}
	
	var tableContainer = $("<table class='table table-bordered table-responsive' id='table-EXP-4'></table>");
	$(mainContainer).append(tableContainer);
	$("#customTables").append(mainContainer);
	$(tableContainer).append("<thead></thead>");
	$(tableContainer).append("<tbody></tbody>");
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	$(row).append("<td colspan='16' class='thd statCell'>Best EXP/Realm</td>");
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	$(row).append("<td colspan='5' class='th statCell' onclick='doEXPSort(\"realm\", \"name\", 1)'>Dungeon</td>");
	$(row).append("<td colspan='1' class='th statCell' onclick='doEXPSort(\"realm\", \"realm\", 0)'>Realm</td>");
	$(row).append("<td colspan='1' class='th statCell' onclick='doEXPSort(\"realm\", \"stage\", 0)'>Stage</td>");
	$(row).append("<td colspan='1' class='th statCell' onclick='doEXPSort(\"realm\", \"stam\", 0)'>Stamina</td>");
	$(row).append("<td colspan='2' class='th statCell' onclick='doEXPSort(\"realm\", \"exp\", 0)'>EXP/Stamina</td>");
	for (var i = 0; i < 13; i++) {
		if (i == 10) {}
		else {
			var row = $("<tr></tr>");
			$(tableContainer).append(row);
			$(row).append("<td id='exp-list-name-realm-" + i + "' colspan='5' class='th statCell'></td>");
			$(row).append("<td id='exp-list-realm-realm-" + i + "' colspan='1' class='td statCell'></td>");
			$(row).append("<td id='exp-list-stage-realm-" + i + "' colspan='1' class='td statCell'></td>");
			$(row).append("<td id='exp-list-stam-realm-" + i + "' colspan='1' class='td statCell'>1</td>");
			$(row).append("<td id='exp-list-exp-realm-" + i + "' colspan='2' class='td statCell'>1</td>");
		}
	}
	
	var tableContainer = $("<table class='table table-bordered table-responsive' id='table-EXP'></table>");
	$(mainContainer).append(tableContainer);
	$("#customTables").append(mainContainer);
	$(tableContainer).append("<thead></thead>");
	$(tableContainer).append("<tbody></tbody>");
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	$(row).append("<td colspan='16' class='thd statCell'>Classic Dungeons</td>");
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	$(row).append("<td colspan='5' class='th statCell' onclick='doEXPSort(\"classic\", \"name\", 1)'>Dungeon</td>");
	$(row).append("<td colspan='1' class='th statCell' onclick='doEXPSort(\"classic\", \"realm\", 0)'>Realm</td>");
	$(row).append("<td colspan='1' class='th statCell' onclick='doEXPSort(\"classic\", \"stam\", 0)'>Stamina</td>");
	$(row).append("<td colspan='2' class='th statCell' onclick='doEXPSort(\"classic\", \"exp\", 0)'>Total EXP</td>");
	$(row).append("<td colspan='2' class='th statCell' onclick='doEXPSort(\"classic\", \"avg\", 0)'>EXP/Stamina</td>");
	
	var tableContainer = $("<table class='table table-bordered table-responsive' id='table-EXP-2'></table>");
	$(mainContainer).append(tableContainer);
	$("#customTables").append(mainContainer);
	$(tableContainer).append("<thead></thead>");
	$(tableContainer).append("<tbody></tbody>");
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	$(row).append("<td colspan='16' class='thd statCell'>Elite Dungeons</td>");
	var row = $("<tr></tr>");
	$(tableContainer).append(row);
	$(row).append("<td colspan='5' class='th statCell' onclick='doEXPSort(\"elite\", \"name\", 1)'>Dungeon</td>");
	$(row).append("<td colspan='1' class='th statCell' onclick='doEXPSort(\"elite\", \"realm\", 0)'>Realm</td>");
	$(row).append("<td colspan='1' class='th statCell' onclick='doEXPSort(\"elite\", \"stam\", 0)'>Stamina</td>");
	$(row).append("<td colspan='2' class='th statCell' onclick='doEXPSort(\"elite\", \"exp\", 0)'>EXP</td>");
	$(row).append("<td colspan='2' class='th statCell' onclick='doEXPSort(\"elite\", \"avg\", 0)'>EXP/Stamina</td>");
	
	for (var key in dungeonList) {
		var row = $("<tr></tr>");
		tableContainer = $("#table-EXP");
		$(tableContainer).append(row);
		$(row).append("<td id='exp-list-name-classic-" + cleanKey(key) + "' colspan='5' class='th statCell itemClear'>" + key + "</td>");
		$(row).append("<td id='exp-list-realm-classic-" + cleanKey(key) + "' colspan='1' class='td statCell'>" + key.split('[')[1].replace(']', '') + "</td>");
		var stam = 0;
		if (dungeonList[key]["Required Stamina"].length) {
			$.each(dungeonList[key]["Required Stamina"], function() {
				stam += this;
			});
		}
		else
			stam = dungeonList[key]["Required Stamina"];
		$(row).append("<td id='exp-list-stam-classic-" + cleanKey(key) + "' colspan='1' class='td statCell'>" + stam + "</td>");
		var tEXP = 0;
		$.each(dungeonList[key]["EXP"], function() {
			tEXP += this;
		});
		$(row).append("<td id='exp-list-exp-classic-" + cleanKey(key) + "' colspan='1' class='td statCell'>" + tEXP + "</td>");
		var aEXP = Math.round(tEXP / stam);
		$(row).append("<td id='exp-list-avg-classic-" + cleanKey(key) + "' colspan='2' class='td statCell'>" + aEXP + "</td>");
		
		var index = -1;
		var stages = 1;
		if (dungeonList[key]["EXP"].length)
			stages = dungeonList[key]["EXP"].length;
		for (var s = 0; s < stages; s++) {
			var sEXP = parseInt(dungeonList[key]["EXP"][s]) / parseInt(dungeonList[key]["Required Stamina"][s]);
			if (parseInt($("#exp-list-exp-top-9").text()) < sEXP) {
				for (var i = 0; i < 10; i++) {
					var cEXP = parseInt($("#exp-list-exp-top-" + i).text());
					if (sEXP > cEXP) {
						index = i;
						break;
					}
				}
				if (index >= 0) {
					for (var i = 9; i >= index; i--) {
						var j = i - 1;
						$("#exp-list-name-top-" + i).text($("#exp-list-name-top-" + j).text());
						$("#exp-list-realm-top-" + i).text($("#exp-list-realm-top-" + j).text());
						$("#exp-list-stage-top-" + i).text($("#exp-list-stage-top-" + j).text());
						$("#exp-list-stam-top-" + i).text($("#exp-list-stam-top-" + j).text());
						$("#exp-list-exp-top-" + i).text($("#exp-list-exp-top-" + j).text());
					}
					$("#exp-list-name-top-" + index).text(key + " (Classic)");
					$("#exp-list-realm-top-" + index).text(key.split('[')[1].replace(']', ''));
					$("#exp-list-stage-top-" + index).text(s + 1);
					$("#exp-list-stam-top-" + index).text(dungeonList[key]["Required Stamina"][s]);
					$("#exp-list-exp-top-" + index).text(Math.round(sEXP));
				}
			}
			var realm = convertNumerals(key.split('[')[1].replace(']', '')) - 1;
			if ((sEXP * 1.5) > parseInt($("#exp-list-exp-realm-" + realm).text())) {
				$("#exp-list-name-realm-" + realm).text(key + " (Classic)");
				$("#exp-list-realm-realm-" + realm).text(key.split('[')[1].replace(']', ''));
				$("#exp-list-stage-realm-" + realm).text(s + 1);
				$("#exp-list-stam-realm-" + realm).text(dungeonList[key]["Required Stamina"][s]);
				$("#exp-list-exp-realm-" + realm).text(Math.round(sEXP * 1.5));
			}
		}
	}
	
	for (var key in eliteList) {
		tableContainer = $("#table-EXP-2");
		var row = $("<tr></tr>");
		$(tableContainer).append(row);
		$(row).append("<td id='exp-list-name-elite-" + cleanKey(key) + "' colspan='5' class='th statCell'>" + key + "</td>");
		$(row).append("<td id='exp-list-realm-elite-" + cleanKey(key) + "' colspan='1' class='td statCell'>" + key.split('[')[1].replace(']', '') + "</td>");
		var stam = 0;
		if (eliteList[key]["Required Stamina"].length) {
			$.each(eliteList[key]["Required Stamina"], function() {
				stam += this;
			});
		}
		else
			stam = eliteList[key]["Required Stamina"];
		$(row).append("<td id='exp-list-stam-elite-" + cleanKey(key) + "' colspan='1' class='td statCell'>" + stam + "</td>");
		var tEXP = 0;
		$.each(eliteList[key]["EXP"], function() {
			tEXP += this;
		});
		$(row).append("<td id='exp-list-exp-elite-" + cleanKey(key) + "' colspan='1' class='td statCell'>" + tEXP + "</td>");
		var aEXP = Math.round(tEXP / stam);
		$(row).append("<td id='exp-list-avg-elite-" + cleanKey(key) + "' colspan='2' class='td statCell'>" + aEXP + "</td>");
		
		var index = -1;
		var stages = 1;
		if (eliteList[key]["EXP"].length)
			stages = eliteList[key]["EXP"].length;
		for (var s = 0; s < stages; s++) {
			var sEXP = parseInt(eliteList[key]["EXP"][s]) / parseInt(eliteList[key]["Required Stamina"][s]);
			if (parseInt($("#exp-list-exp-top-9").text()) < sEXP) {
				for (var i = 0; i < 10; i++) {
					var cEXP = parseInt($("#exp-list-exp-top-" + i).text());
					if (sEXP > cEXP) {
						index = i;
						break;
					}
				}
				if (index >= 0) {
					for (var i = 9; i >= index; i--) {
						var j = i - 1;
						$("#exp-list-name-top-" + i).text($("#exp-list-name-top-" + j).text());
						$("#exp-list-realm-top-" + i).text($("#exp-list-realm-top-" + j).text());
						$("#exp-list-stage-top-" + i).text($("#exp-list-stage-top-" + j).text());
						$("#exp-list-stam-top-" + i).text($("#exp-list-stam-top-" + j).text());
						$("#exp-list-exp-top-" + i).text($("#exp-list-exp-top-" + j).text());
					}
					$("#exp-list-name-top-" + index).text(key + " (Elite)");
					$("#exp-list-realm-top-" + index).text(key.split('[')[1].replace(']', ''));
					$("#exp-list-stage-top-" + index).text(s + 1);
					$("#exp-list-stam-top-" + index).text(eliteList[key]["Required Stamina"][s]);
					$("#exp-list-exp-top-" + index).text(Math.round(sEXP));
				}
			}
			var realm = convertNumerals(key.split('[')[1].replace(']', '')) - 1;
			if ((sEXP * 1.5) > parseInt($("#exp-list-exp-realm-" + realm).text())) {
				$("#exp-list-name-realm-" + realm).text(key + " (Elite)");
				$("#exp-list-realm-realm-" + realm).text(key.split('[')[1].replace(']', ''));
				$("#exp-list-stage-realm-" + realm).text(s + 1);
				$("#exp-list-stam-realm-" + realm).text(eliteList[key]["Required Stamina"][s]);
				$("#exp-list-exp-realm-" + realm).text(Math.round(sEXP * 1.5));
			}
		}
	}
}

function doEXPSort(table, column, isText) {
	var $items = $("[id^=exp-list-" + column + "-" + table + "]");
	var parent = $("#exp-list-" + table);
	
	$items.sort(function(a,b) {
		var an = a.textContent,
			bn = b.textContent;
		
		if (parseInt(isText) == 0) {
			an = parseInt(convertNumerals(an));
			bn = parseInt(convertNumerals(bn));
		}

		if (an > bn) {
			return parseInt(isText) ? 1 : -1;
		}
		if (an < bn) {
			return parseInt(isText) ? -1 : 1;
		}
		return 0;
	});
	$items.each(function() {
		var id = $(this).attr('id').split('-')[$(this).attr('id').split('-').length - 1];
		var $move = $("[id*='-" + table + "-" + id + "']");
		$move.each(function() {
			var col = $(this).attr('id').split('-')[$(this).attr('id').split('-').length - 3];
			if (col != "test") {
				if (col == column)
					$(this).addClass("sortedHi");
				else
					$(this).removeClass("sortedHi");
				$(this).detach().appendTo(parent);
			}
		});
	});
}

function listQuests() {
	$('body,html').removeClass('fixWidth');
	clearTables();
	document.getElementById("News").style.display = "none";
	document.getElementById("sidebar").style.display = "none";
	
	var mainContainer = $("<div id='quest-list' class='mainTable col-xs-14 row'></div>");
	$("#customTables").append(mainContainer);	
	for (var key in questList) {
		var tableContainer = $("#quest-list-" + cleanKey(questList[key]["category"]));
		if ($(tableContainer).attr('id')) {
			var row = $("<tr></tr>");
			$(tableContainer).append(row);
			$(row).append("<td colspan='5' class='th statCell itemClear'>" + key + "</td>");
			$(row).append("<td colspan='5' class='td statCell'>" + questList[key]["goal"] + "</td>");
			$(row).append("<td colspan='6' class='td statCell'>" + questList[key]["reward"] + "</td>");
		}
		else {
			var tableContainer = $("<table class='table table-bordered table-responsive' id='table-quests'></table>");
			$(mainContainer).append(tableContainer);
			$(tableContainer).append("<thead><tr><td colspan='16' class='thd statCell'>" + questList[key]["category"] + "</td></tr></thead>");
			$(tableContainer).append("<tbody id='quest-list-" + cleanKey(questList[key]["category"]) + "'></tbody>");
			var row = $("<tr></tr>");
			$(tableContainer).append(row);
			$(row).append("<td colspan='5' class='th statCell'>Name</td>");
			$(row).append("<td colspan='5' class='th statCell'>Goal</td>");
			$(row).append("<td colspan='6' class='th statCell'>Reward</td>");
			var row = $("<tr></tr>");
			$(tableContainer).append(row);
			$(row).append("<td colspan='5' class='th statCell'>" + key + "</td>");
			$(row).append("<td colspan='5' class='td statCell'>" + questList[key]["goal"] + "</td>");
			$(row).append("<td colspan='6' class='td statCell'>" + questList[key]["reward"] + "</td>");
		}
	}
}

//Calc functions
function changeChar(newChar) {
	newChar = dirtyKey(newChar);
	selectedChar = newChar;
	$("#selCha").text(selectedChar).append("<b class='caret'></b>");
	var id = $("[id*=-name-").last().attr('id');
	if (id) {
		if (id.split('-')[0] == "items")
			listItemsByType(limitit);
		else if (id.split('-')[0] == "abilities")
			listAbilities(limitit);
	}
	clearLevelList();
	popLevelList();
	estCharStats();
}

function changeLevel(newLevel) {
	selectedLevel = parseInt(newLevel);
	$("#selLev").text(selectedLevel).append("<b class='caret'></b>");
	doSelectStats();
}

function changeRealm(newRealm) {
	selectedRealm = newRealm;
	$("#selRea").text(selectedRealm).append("<b class='caret'></b>");
	resetItemTables();
	doSelectStats();
}

function doSelectStats() {
	estCharStats();
	for (var i = 0; i < gearStats.length; i++) {
		selectedStats[gearStats[i]] = 0;
	}
	for (var i = 0; i < gearStats.length; i++) {
		var $stat = $("[id$='-value-" + gearStats[i] + "']");
		$stat.each(function() {
			if ($(this).hasClass("tdSelected")) {
				selectedStats[gearStats[i]] += parseInt($(this).text());
			}
		});
	}
	for (var i = 0; i < gearStats.length; i++) {
		var $val = $("#sel" + gearStats[i]);
		if (selectedStats[gearStats[i]] > 0) {
			$val.text(parseInt($val.text()) + selectedStats[gearStats[i]]);
			$val.addClass("statHi");
		}
		else
			$val.removeClass("statHi");
	}
}

function estCharStats() {
	var lvl = selectedLevel;
	var cha = selectedChar;
	if (charList[cha]["realm"] == selectedRealm) {
		$("#selCha").addClass("synergyHi");
		$("#selRea").addClass("synergyHi");
		lvl = lvl + 10;
	}
	else {
		$("#selCha").removeClass("synergyHi");
		$("#selRea").removeClass("synergyHi");
	}
	var stat = 0;
	
	for (var i = 0; i < gearStats.length; i++) {
		if (lvl == 1)
			stat = charList[cha]["baseStats"][gearStats[i]];
		else if (lvl <= 50) {
			stat = charList[cha]["baseStats"][gearStats[i]] + (((charList[cha]["maxStats"][gearStats[i]] - charList[cha]["baseStats"][gearStats[i]]) / 49) * (lvl - 1));
		}
		else if (lvl <= 65 && lvl > 50) {
			if (charList[cha]["65Stats"])
				stat = charList[cha]["maxStats"][gearStats[i]] + (((charList[cha]["65Stats"][gearStats[i]] - charList[cha]["maxStats"][gearStats[i]]) / 15) * (lvl - 50));
			else
				stat = charList[cha]["maxStats"][gearStats[i]] + (((charList[cha]["maxStats"][gearStats[i]] - charList[cha]["baseStats"][gearStats[i]]) / 49) * (lvl - 50));
		}
		else {
			if (charList[cha]["80Stats"])
				stat = charList[cha]["65Stats"][gearStats[i]] + (((charList[cha]["80Stats"][gearStats[i]] - charList[cha]["65Stats"][gearStats[i]]) / 15) * (lvl - 65));
			else
				stat = charList[cha]["65Stats"][gearStats[i]] + (((charList[cha]["65Stats"][gearStats[i]] - charList[cha]["maxStats"][gearStats[i]]) / 15) * (lvl - 65));
		}
		selectedStats[gearStats[i]] = parseInt(stat);
		var $val = $("#sel" + gearStats[i]);
		if (selectedStats[gearStats[i]] > 0) {
			$val.text(selectedStats[gearStats[i]]);
		}
	}
}

//Login Functions
function doLogin() {
	var req = new XMLHttpRequest();
	var url = "doLogin.php";
	var uName = document.getElementById("inputUsername").value.trim();
	var uPass = document.getElementById("inputPassword").value.trim();
	var vars = "name=" + uName + "&password=" + uPass;
	req.open("POST", url, true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			var ret_data = req.responseText;
			//make sure it didn't error
			if (ret_data.split(' ')[0] == "Invalid" || ret_data.split(' ')[0] == "Username")
				document.getElementById("loginErrors").textContent = ret_data;
			else {
				ret_data = ret_data.replace(/\|\|/g, "|");
				var char_data = ret_data.split(',')[1];
				ret_data = ret_data.split(',')[0];
				//parse character data
				for (var i = 0; i < char_data.split('|').length; i++) {
					ownedChars[i] = dirtyKey(char_data.split('|')[i]);
				}
				lastlogval = ret_data.split('|')[0];
				var clickToMenu = ret_data.split('|')[1];
				var limitToInv = ret_data.split('|')[2];
				//parse inventory data
				for (var i = 3; i < ret_data.split('|').length; i++)
					ownedItems[i-3] = dirtyKey(ret_data.split('|')[i]);
				//record username
				loggedUser = uName;
				//create cookie for Remember Me functionality
				if ($("[name='rememberCheck']").prop('checked')) {
					var cookieVal = uName + "|" + lastlogval;
					createCookie("lastloginval", cookieVal);
				}
				//switch Login panel to Logged In panel
				document.getElementById("loginForm").style.display = "none";
				document.getElementById("loggedUserContainer").style.display = "";
				document.getElementById("registerForm").style.display = "none";
				$("#loggedUser").text(loggedUser);
			}
		}
	};
	req.send(vars);
}

function doLogOut() {
	loggedUser = "";
	lastlogval = "";
	ownedItems = [];
	ownedChars = [];
	document.getElementById("inputUsername").value = "";
	document.getElementById("inputPassword").value = "";
	document.getElementById("loginForm").style.display = "";
	document.getElementById("registerForm").style.display = "none";
	document.getElementById("loggedUserContainer").style.display = "none";
	document.getElementById("loggedUser").textContent = "";
	createCookie("lastloginval", "");
}

function displayRegister() {
	document.getElementById("inputUsername").value = "";
	document.getElementById("inputPassword").value = "";
	document.getElementById("loginForm").style.display = "none";
	document.getElementById("loggedUserContainer").style.display = "none";
	document.getElementById("registerForm").style.display = "";
}

function doRegister() {
	var req = new XMLHttpRequest();
	var url = "doRegister.php";
	var uName = document.getElementById("regUsername").value.trim();
	var uPass = document.getElementById("regPassword").value.trim();
	var pCon = document.getElementById("regPassConf").value.trim();
	if (uPass == pCon)
	{
		var vars = "name=" + uName + "&password=" + uPass;
		req.open("POST", url, true);
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				var ret_data = req.responseText;
				//make sure it didn't error
				if (ret_data.split(' ')[0] == "Usernames" || ret_data.split(' ')[0] == "Username")
					document.getElementById("regErrors").textContent = ret_data;
				else {
					lastlogval = ret_data.split('|');
					//record username
					loggedUser = uName;
					//create cookie for Remember Me functionality
					if ($("[name='rememberCheck']").prop('checked')) {
						var cookieVal = uName + "|" + lastlogval;
						createCookie("lastloginval", cookieVal);
					}
					//switch Login panel to Logged In panel
					document.getElementById("loginForm").style.display = "none";
					document.getElementById("loggedUserContainer").style.display = "";
					document.getElementById("registerForm").style.display = "none";
					$("#loggedUser").text(loggedUser);
				}
			}
		};
		req.send(vars);
	}
	else
		document.getElementById("regErrors").textContent = "Passwords must match";
}

function checkAutoLog() {
	if (readCookie("lastloginval")) {
		var lvaluser = readCookie("lastloginval").split("|")[0];
		var lval = readCookie("lastloginval").split("|")[1];
		doAutoLog(lvaluser, lval);
	}
}

function doAutoLog(uName, uLval) {
	var req = new XMLHttpRequest();
	var url = "autoLogin.php";
	var vars = "name=" + uName + "&lval=" + uLval;
	req.open("POST", url, true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			var ret_data = req.responseText;
			//make sure it didn't error
			if (ret_data.split(' ')[0] == "Invalid" || ret_data.split(' ')[0] == "Username") {}
				//document.getElementById("loginErrors").textContent = ret_data;
			else {
				ret_data = ret_data.replace(/\|\|/g, "|");
				var char_data = ret_data.split(',')[1];
				ret_data = ret_data.split(',')[0];
				//parse character data
				for (var i = 0; i < char_data.split('|').length; i++) {
					ownedChars[i] = dirtyKey(char_data.split('|')[i]);
				}
				lastlogval = ret_data.split('|')[0];
				var clickToMenu = ret_data.split('|')[1];
				var limitToInv = ret_data.split('|')[2];
				//parse inventory data
				for (var i = 3; i < ret_data.split('|').length; i++)
					ownedItems[i-3] = dirtyKey(ret_data.split('|')[i]);
				//record username
				loggedUser = uName;
				//create cookie for Remember Me functionality
				var cookieVal = uName + "|" + lastlogval;
				createCookie("lastloginval", cookieVal);
				//switch Login panel to Logged In panel
				document.getElementById("loginForm").style.display = "none";
				document.getElementById("registerForm").style.display = "none";
				document.getElementById("loggedUserContainer").style.display = "";
				$("#loggedUser").text(loggedUser);
			}
		}
	};
	req.send(vars);
}

function updateInventory() {
	var req = new XMLHttpRequest();
	var url = "updateInventory.php";
	var inventory = [];
	for (var i = 0; i < ownedItems.length; i++)
		inventory = inventory + "|" + ownedItems[i];
	inventory = cleanKey(inventory);
	var vars = "name=" + loggedUser + "&inven=" + inventory;
	req.open("POST", url, true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			var ret_data = req.responseText;
			//make sure it didn't error
			if (ret_data.split(' ')[0] == "Invalid" || ret_data.split(' ')[0] == "Username") {}
				//document.getElementById("loginErrors").textContent = ret_data;
			else {
				//nothing needs to be done
			}
		}
	};
	req.send(vars);
}

function updateCharacters(character) {
	character = dirtyKey(character);
	if (!arrayContains(ownedChars, character)) {
		arrayAdd(ownedChars, character);
		character = cleanKey(character);
		$("#owned-" + character).attr("src", "images/style/menuCheckboxIndicatorChecked.png");
	}
	else {
		arrayRemove(ownedChars, character);
		character = cleanKey(character);
		$("#owned-" + character).attr("src", "images/style/menuCheckboxIndicator.png");
	}
	if (loggedUser) {
		var req = new XMLHttpRequest();
		var url = "updateCharacters.php";
		var inventory = [];
		for (var i = 0; i < ownedChars.length; i++)
			inventory = inventory + "|" + ownedChars[i];
		inventory = cleanKey(inventory);
		var vars = "name=" + loggedUser + "&inven=" + inventory;
		req.open("POST", url, true);
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				var ret_data = req.responseText;
				//make sure it didn't error
				if (ret_data.split(' ')[0] == "Invalid" || ret_data.split(' ')[0] == "Username") {}
					//document.getElementById("loginErrors").textContent = ret_data;
				else {
					//nothing needs to be done
				}
			}
		};
	}
	req.send(vars);
}

//Account functions
function myAccount() {
	$('body,html').removeClass('fixWidth');
	clearTables();
	document.getElementById("News").style.display = "none";
	document.getElementById("sidebar").style.display = "none";
	//change password
	//change email
	//reset owned
	//possibly other stuff
}

//Misc functions
function canCharUse(type) {
	if (type == "Accessory" || type == "Weapons" || type == "Armors" || type == "Accessories")
		return 1;
	else if (arrayContains(charList[selectedChar]["useWeapons"], type))
		return 1;
	else if (arrayContains(charList[selectedChar]["useArmor"], type))
		return 1;
	for (var key in charList[selectedChar]["useAbility"]) {
		if (key == type)
			return 1;
	}
	return 0;
}

function convertNumerals(numeral) {
	if (numeral == "Core")
		return 0;
	else if (numeral == "I")
		return 1;
	else if (numeral == "II")
		return 2;
	else if (numeral == "III")
		return 3;
	else if (numeral == "IV")
		return 4;
	else if (numeral == "V")
		return 5;
	else if (numeral == "VI")
		return 6;
	else if (numeral == "VII")
		return 7;
	else if (numeral == "VIII")
		return 8;
	else if (numeral == "IX")
		return 9;
	else if (numeral == "X")
		return 10;
	else if (numeral == "XI")
		return 11;
	else if (numeral == "XII")
		return 12;
	else if (numeral == "XIII")
		return 13;
	else if (numeral == "XIV")
		return 14;
	else
		return numeral;
}

function popMenuLists() {
	//var challenge = document.getElementById("eventChallenge"); 
	//var survival = document.getElementById("eventSurvival");
	//var collection = document.getElementById("eventCollection");
	var added = [];
	if (document.getElementById("curr1"))
		arrayAdd(added, document.getElementById("curr1").textContent);
	if (document.getElementById("curr2"))
		arrayAdd(added, document.getElementById("curr2").textContent);
	if (document.getElementById("curr3"))
		arrayAdd(added, document.getElementById("curr3").textContent);
	/*for (var key in eventList) {	
		if (eventList[key]["Type"] == "Challenge" && !arrayContains(added, eventList[key]["Realm"])) {
			var li = document.createElement("li");
			var link = document.createElement("a");
			var text = document.createTextNode(eventList[key]["Realm"]);
			link.appendChild(text);
						link.href = "javascript:listDunByType('" + cleanKey(eventList[key]["Realm"]) + "')";
						li.appendChild(link);
						challenge.appendChild(li);
			arrayAdd(added, eventList[key]["Realm"]);
		}
		else if (eventList[key]["Type"] == "Survival" && !arrayContains(added, eventList[key]["Realm"])) {
			var li = document.createElement("li");
			var link = document.createElement("a");
			var text = document.createTextNode(eventList[key]["Realm"]);
			link.appendChild(text);
						link.href = "javascript:listDunByType('" + cleanKey(eventList[key]["Realm"]) + "')";
						li.appendChild(link);
						survival.appendChild(li);
			arrayAdd(added, eventList[key]["Realm"]);
		}
		else if (eventList[key]["Type"] == "Collection" && !arrayContains(added, eventList[key]["Realm"])) {
			var li = document.createElement("li");
			var link = document.createElement("a");
			var text = document.createTextNode(eventList[key]["Realm"]);
			link.appendChild(text);
						link.href = "javascript:listDunByType('" + cleanKey(eventList[key]["Realm"]) + "')";
						li.appendChild(link);
						collection.appendChild(li);
			arrayAdd(added, eventList[key]["Realm"]);
		}
	}*/
	popLevelList();
}

function clearLevelList() {
	var customTable = document.getElementById("currLevel");
	while (customTable.lastChild)
		customTable.removeChild(customTable.lastChild);
	//document.getElementById("News").style.display = "block";
}

function popLevelList() {
	var level = document.getElementById("currLevel");
	if (charList[selectedChar]["80Stats"]) {
		for (var i = 1; i < 81; i++) {
			var li = document.createElement("li");
			var link = document.createElement("a");
			var text = document.createTextNode(i);
			link.appendChild(text);
			link.href = "javascript:changeLevel('" + i + "')";
			li.appendChild(link);
			level.appendChild(li);
		}
	}
	else if (charList[selectedChar]["65Stats"]) {
		for (var i = 1; i < 66; i++) {
			var li = document.createElement("li");
			var link = document.createElement("a");
			var text = document.createTextNode(i);
			link.appendChild(text);
			link.href = "javascript:changeLevel('" + i + "')";
			li.appendChild(link);
			level.appendChild(li);
		}
	}
	else {
		for (var i = 1; i < 51; i++) {
			var li = document.createElement("li");
			var link = document.createElement("a");
			var text = document.createTextNode(i);
			link.appendChild(text);
			link.href = "javascript:changeLevel('" + i + "')";
			li.appendChild(link);
			level.appendChild(li);
		}
	}
	var charName = document.getElementById("currChar");
	var sortedChars = [];
	for (var key in charList) {
		insertAt = sortedChars.length;
		for (var i = 0; i < sortedChars.length; i++) {
			if (key < sortedChars[i]) {
				insertAt = i;
				break;
			}
		}
		sortedChars.splice(insertAt, 0, key);
	}
	for (var i = 0; i < sortedChars.length; i++) {
		var li = document.createElement("li");
		var link = document.createElement("a");
		var text = document.createTextNode(sortedChars[i]);
		link.appendChild(text);
		link.href = "javascript:changeChar('" + cleanKey(sortedChars[i]) + "')";
		li.appendChild(link);
		charName.appendChild(li);
	}
}
function clearTables() {
	$("#customTables").children().remove();
}

function showNews() {
	$('body,html').removeClass('fixWidth');
	clearTables();
	document.getElementById("News").style.display = "block";
	document.getElementById("sidebar").style.display = "block";
}

function arrayContains(list, item) {
		if (list == item)
				return true;
	if (list)
		for (var i = 0; i < list.length; i++)
			if (list[i] == item)
				return true;
	return false;
}

function arrayRemove(list, item) {
	if (list)
		for (var i = list.length - 1; i >= 0; i--)
			if (list[i] == item)
				list.splice(i, 1);
}

function arrayAdd(list, item) {
	if (list)
		list.splice(-1, 0, item);
}

function addClassName(node, className) {
	var classNames = node.className.split(" ");
	var newClassNames = [];
	for (var i = 0; i < classNames.length; i++)
		if (classNames[i] != className)
			newClassNames[newClassNames.length] = classNames[i];
	newClassNames[newClassNames.length] = className;
	node.className = newClassNames.join(" ");
}

function removeClassName(node, className) {
	var classNames = node.className.split(" ");
	var newClassNames = [];
	for (var i = 0; i < classNames.length; i++)
		if (classNames[i] != className)
			newClassNames[newClassNames.length] = classNames[i];
	node.className = newClassNames.join(" ");
}

function hasClassName(node, className) {
	var classNames = node.className.split(" ");
	for (var i = 0; i < classNames.length; i++)
		if (classNames[i] == className)
			return true;
	return false;
}

function checkFile(urlToFile) {
		var xhr = new XMLHttpRequest();
		xhr.open('HEAD', urlToFile, false);
		xhr.send();
		 
		if (xhr.status == "404") {
				return false;
		} 
	else {
				return true;
		}
}

function initPage() {
	initTimers();
	$(document).ready(function() {
		popMenuLists();
		estCharStats();
		countStamShards();
		checkAutoLog();
		
		var menu = $('#topNav');
		var origOffsetY = menu.offset().top;

		function scroll() {
			if ($(window).scrollTop() >= origOffsetY) {
				$('#topNav').addClass('navbar-fixed-top');
				$('#topNav').removeClass('navbar-static-top');
			} 
			else {
				$('#topNav').removeClass('navbar-fixed-top');
				$('#topNav').addClass('navbar-static-top');
			}
		}
		document.onscroll = scroll;
	});
}

function countStamShards() {
	var shardCount = 0;
	for (var key in dungeonList) {
		var i1 = dungeonList[key]["First Time Rewards"].split(', ')[0];
		var i2 = dungeonList[key]["First Time Rewards"].split(', ')[1];
		if (i1.split(' x')[0] == "Stamina Shard")
			shardCount = shardCount + parseInt(i1.split(' x')[1]);
		if (i2)
			if (i2.split(' x')[0] == "Stamina Shard")
				shardCount = shardCount + parseInt(i2.split(' x')[1]);
		i1 = dungeonList[key]["Mastery Reward"].split(', ')[0];
		i2 = dungeonList[key]["Mastery Reward"].split(', ')[1];
		if (i1.split(' x')[0] == "Stamina Shard")
			shardCount = shardCount + parseInt(i1.split(' x')[1]);
		if (i2)
			if (i2.split(' x')[0] == "Stamina Shard")
				shardCount = shardCount + parseInt(i2.split(' x')[1]);
	}
	for (var key in eliteList) {
		var i1 = eliteList[key]["First Time Rewards"].split(', ')[0];
		var i2 = eliteList[key]["First Time Rewards"].split(', ')[1];
		if (i1.split(' x')[0] == "Stamina Shard")
			shardCount = shardCount + parseInt(i1.split(' x')[1]);
		if (i2)
			if (i2.split(' x')[0] == "Stamina Shard")
				shardCount = shardCount + parseInt(i2.split(' x')[1]);
		i1 = eliteList[key]["Mastery Reward"].split(', ')[0];
		i2 = eliteList[key]["Mastery Reward"].split(', ')[1];
		if (i1.split(' x')[0] == "Stamina Shard")
			shardCount = shardCount + parseInt(i1.split(' x')[1]);
		if (i2)
			if (i2.split(' x')[0] == "Stamina Shard")
				shardCount = shardCount + parseInt(i2.split(' x')[1]);
	}
	shardCount = 30 + parseInt(shardCount / 5) + " & " + ((shardCount % 5)) + " shards";
	document.getElementById("mStam").textContent = shardCount;
}

function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	} else 
		var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name, defaultValue) {
	var cookies = document.cookie.split(";");
	var val = null;
	for(var i = 0; i < cookies.length; i++) {
		if (cookies[i].split("=")[0].trim() == name) {
			val = cookies[i].split("=")[1];
		}
	}
	return val;
}

//clock functions
function initTimers() {
	var date = new Date('2016-03-15T00:59:00Z');
	var timer1 = new CountDownTimer(date);
	timer1.onTick(format1).start();
	var date2 = new Date('2016-03-19T00:59:00Z');
	var timer2 = new CountDownTimer(date2);
	timer2.onTick(format2).start();
	var date3 = new Date("2016-03-11T00:59:00Z");
	var timer3 = new CountDownTimer(date3);
	timer3.onTick(format3).start();
}

function convertUTCDateToLocalDate(date) {
	var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

	var offset = date.getTimezoneOffset() / 60;
	var hours = date.getHours();

	newDate.setHours(hours - offset);

	return newDate;   
}

function format1(days, hours, minutes, seconds) {
	//alert(days + " " + hours + " " + minutes + " " + seconds);
	var display1 = document.getElementById("timer1");
	days = days;
	hours = hours;
	minutes = minutes;
	seconds = seconds;
	if (days > 0 || hours > 0 || minutes > 0 || seconds > 0)
		display1.textContent = days + "D " + hours + "H " + minutes + "M " + seconds + "s";
	else {
		$("#curr1").hide();
		$("#timer1").hide();
	}
}

function format2(days, hours, minutes, seconds) {
	//alert(days + " " + hours + " " + minutes + " " + seconds);
	var display1 = document.getElementById("timer2");
	days = days;
	hours = hours;
	minutes = minutes;
	seconds = seconds;
	if (days > 0 || hours > 0 || minutes > 0 || seconds > 0)
		display1.textContent = days + "D " + hours + "H " + minutes + "M " + seconds + "s";
	else {
		$("#curr2").hide();
		$("#timer2").hide();
	}
}

function format3(days, hours, minutes, seconds) {
	//alert(days + " " + hours + " " + minutes + " " + seconds);
	var display1 = document.getElementById("timer3");
	days = days;
	hours = hours;
	minutes = minutes;
	seconds = seconds;
	if (days > 0 || hours > 0 || minutes > 0 || seconds > 0)
		display1.textContent = days + "D " + hours + "H " + minutes + "M " + seconds + "s";
	else {
		$("#curr3").hide();
		$("#timer3").hide();
	}
}

function CountDownTimer (endDate) {
	var date = new Date();
	var duration = endDate.getTime() - date.getTime();
	this.duration = duration / 1000;
	this.granularity = 1000;
	this.tickFtns = [];
	this.running = false;
}

CountDownTimer.prototype.start = function() {
	if (this.running) {
		return;
	}
	this.running = true;
	var start = Date.now(),
		that = this,
		diff, obj;

	(function timer() {
		diff = that.duration - (((Date.now() - start) / 1000) | 0);

		if (diff > 0) {
			setTimeout(timer, that.granularity);
		} 
		else {
			diff = 0;
			that.running = false;
		}

		obj = CountDownTimer.parse(diff);
		that.tickFtns.forEach(function(ftn) {
				ftn.call(this, obj.days, obj.hours, obj.minutes, obj.seconds);
		}, that);
	}());
};

CountDownTimer.prototype.onTick = function(ftn) {
	if (typeof ftn === 'function') {
		this.tickFtns.push(ftn);
	}
	return this;
};

CountDownTimer.prototype.expired = function() {
	return !this.running;
};

CountDownTimer.parse = function(seconds) {
	var days = Math.floor(seconds / 86400);
	var hours = Math.floor((seconds % 86400) / 3600);
	var mins = Math.floor(((seconds % 86400) % 3600) / 60);
	var secs = seconds % 60;
	return {
		'days': days | 0,
		'hours': hours | 0,
		'minutes': mins | 0,
		'seconds': secs | 0
	};
};

//debugging
function getTimeDiff() {
	return new Date().getTime() - performance.timing.navigationStart;
}

function log(message) {
	if (window.console) {
		console.log(getTimeDiff() + 'ms :: ' + message);
		if (console.timeStamp){
			console.timeStamp(message);
		}
	}
}