(function(){
 const $=id=>document.getElementById(id), intro=$('intro');let opening=false;
 const song=$('weddingMusic'), musicToggle=$('musicToggle'), musicMute=$('musicMute');
 song.volume=0.85;
 function musicUI(){
   const isPlaying=!song.paused&&!song.ended;
   musicToggle.textContent=isPlaying?'❚❚ Pause Song':'♫ Play Song';
   musicToggle.setAttribute('aria-label',isPlaying?'Pause wedding song':'Play wedding song');
   musicToggle.setAttribute('aria-pressed',String(isPlaying));
   musicMute.textContent=song.muted?'🔇':'🔊';
   musicMute.setAttribute('aria-label',song.muted?'Unmute wedding music':'Mute wedding music');
   musicMute.setAttribute('aria-pressed',String(song.muted));
 }
 function playWeddingMusic(){
   if(song.muted) song.muted=false;
   const promise=song.play();
   if(promise&&typeof promise.catch==='function')promise.catch(()=>{musicUI();});
   musicUI();
 }
 musicToggle.addEventListener('click',()=>{if(song.paused)playWeddingMusic();else song.pause();musicUI()});
 musicMute.addEventListener('click',()=>{song.muted=!song.muted;musicUI()});
 for(const evt of ['playing','pause','ended','volumechange','error'])song.addEventListener(evt,musicUI);
 musicUI();
 // Muted-autoplay is not used: playback begins on a deliberate invitation-opening tap,
 // satisfying iOS/Android browser media autoplay policies.

 function openIntro(){if(opening)return;opening=true;playWeddingMusic();intro.classList.add('opening');setTimeout(()=>{intro.classList.add('hidden');document.body.classList.remove('locked');opening=false;},1250)}
 function replayIntro(){intro.classList.remove('hidden','opening');document.body.classList.add('locked');window.scrollTo({top:0,behavior:'instant'})}
 $('openInvitation').addEventListener('click',openIntro);$('replayIntro').addEventListener('click',replayIntro);$('replayFooter').addEventListener('click',replayIntro);
 const wedding=new Date('2026-10-25T10:30:00+05:30').getTime();
 function tick(){let sec=Math.max(0,Math.floor((wedding-Date.now())/1000)),d=Math.floor(sec/86400),h=Math.floor(sec%86400/3600),m=Math.floor(sec%3600/60),s=sec%60;[['cdays',d],['chours',h],['cmins',m],['csecs',s]].forEach(([id,v])=>{$(id).firstChild.nodeValue=String(v).padStart(2,'0')});if(sec===0)$('countMessage').textContent='Our wedding day has arrived! ♥'}
 tick();setInterval(tick,1000);
 const cg=$('calendarDates');['S','M','T','W','T','F','S'].forEach(t=>{const e=document.createElement('span');e.className='weekday';e.textContent=t;cg.appendChild(e)});for(let i=0;i<4;i++)cg.appendChild(document.createElement('span'));for(let i=1;i<=31;i++){const e=document.createElement('span');e.textContent=i;if(i===25)e.className='selected-date';cg.appendChild(e)}
 let attend='yes',meal='Veg';document.querySelectorAll('[data-attendance]').forEach(b=>b.addEventListener('click',()=>{attend=b.dataset.attendance;document.querySelectorAll('[data-attendance]').forEach(x=>x.classList.toggle('active',x===b));$('foodGroup').classList.toggle('hidden',attend==='no');$('guestCountGroup').classList.toggle('hidden',attend==='no')}));
 document.querySelectorAll('[data-meal]').forEach(b=>b.addEventListener('click',()=>{meal=b.dataset.meal;document.querySelectorAll('[data-meal]').forEach(x=>x.classList.toggle('active',x===b))}));
 function load(k){try{const v=JSON.parse(localStorage.getItem(k)||'[]');return Array.isArray(v)?v:[]}catch(e){return []}}function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
 let guests=load('srinuma_wedding_guests_20261025_v2'),wishes=load('srinuma_wedding_wishes_20261025_v2');
 const welcomeWishes=[
 {name:'Warm Blessings',message:'May your new journey be filled with love, happiness and beautiful memories.'},
 {name:'Best Wishes',message:'Wishing you both a lifetime of laughter, togetherness and joy.'},
 {name:'With Love',message:'Two hearts, one beautiful future. Congratulations on your wedding!'}
 ];
 const allVisibleWishes=()=>[...wishes,...welcomeWishes];
 function appendText(parent,tag,str,klass){const node=document.createElement(tag);node.textContent=str;if(klass)node.className=klass;parent.appendChild(node);return node}
 function drawGuests(){const root=$('guestList');root.replaceChildren();let shown=guests.filter(x=>x.share);if(!shown.length){root.textContent='No confirmed guests saved in this browser yet.';return}shown.forEach(g=>{const pill=document.createElement('div');pill.className='guestpill';appendText(pill,'b',g.name);appendText(pill,'small',g.attend==='yes'?g.count+' attending · '+g.meal:'Unable to attend');root.appendChild(pill)})}
 function drawWishes(){const root=$('wishFeed');root.replaceChildren();allVisibleWishes().slice(0,18).forEach(w=>{let card=document.createElement('article');card.className='wish-card';appendText(card,'div','“'+w.message+'”','wish-msg');appendText(card,'small','— '+w.name);root.appendChild(card)})}
 $('rsvpForm').addEventListener('submit',e=>{e.preventDefault();const name=$('guestName').value.trim();if(!name)return;const count=attend==='yes'?parseInt($('guestCount').value,10):0;const msg=$('rsvpWish').value.trim();const obj={name,attend,meal:attend==='yes'?meal:'',count,share:$('shareGuestName').checked};guests.unshift(obj);save('srinuma_wedding_guests_20261025_v2',guests);if(msg){wishes.unshift({name,message:msg});save('srinuma_wedding_wishes_20261025_v2',wishes)}drawGuests();drawWishes();$('rsvpSuccess').textContent='Thank you, '+name+'! Your RSVP has been saved.';$('rsvpSuccess').classList.add('show');$('rsvpForm').reset()});
 $('wishForm').addEventListener('submit',e=>{e.preventDefault();const name=$('wishName').value.trim(),message=$('wishMessage').value.trim();if(!name||!message)return;wishes.unshift({name,message});save('srinuma_wedding_wishes_20261025_v2',wishes);drawWishes();$('wishForm').reset();$('wishSuccess').classList.add('show')});drawGuests();drawWishes();
 window.addEventListener('storage',e=>{
   if(e.key==='srinuma_wedding_wishes_20261025_v2'){wishes=load(e.key);drawWishes()}
   if(e.key==='srinuma_wedding_guests_20261025_v2'){guests=load(e.key);drawGuests()}
 });
 const invite='Wedding Invitation 💍\nDr. V. Mani Kanda Prabu & S. Harishma\nSunday, 25 October 2026 · 10:30–11:30 AM\nOVS Palace, Kumaraiyakovil, Ramanathapuram\n'+window.location.href; $('whatsappShare').href='https://wa.me/?text='+encodeURIComponent(invite);
 $('shareButton').addEventListener('click',async()=>{try{if(navigator.share){await navigator.share({title:'Wedding Invitation — Mani Kanda Prabu & Harishma',text:invite,url:location.href});return}if(navigator.clipboard){await navigator.clipboard.writeText(invite);$('shareButton').textContent='✓ Link Copied';return}}catch(e){}window.prompt('Copy the invitation link:',invite)});
})();
