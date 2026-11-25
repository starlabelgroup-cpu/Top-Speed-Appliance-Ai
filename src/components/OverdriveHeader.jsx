import React, {useState} from 'react';
import './overdrive.css';
export default function OverdriveHeader({bookingUrl='/book-service',homeUrl='/'}) {
 const [boost,setBoost]=useState(false);
 return <header className={'ts-header'+(boost?' ts-boost':'')}>
 <div className="ts-top"><a className="ts-brand" href={homeUrl}>TOP <span>SPEED</span><small>APPLIANCE</small></a><div className="ts-lights" aria-hidden="true"><i/><i/><i/></div><div className="ts-gauge" aria-hidden="true"><svg viewBox="0 0 160 100"><path d="M15 80 A65 65 0 0 1 145 80" fill="none" stroke="#45474c" strokeWidth="10"/><path d="M126 34 A65 65 0 0 1 145 80" fill="none" stroke="#ff3030" strokeWidth="10"/>{Array.from({length:9},(_,i)=><path key={i} d="M80 16 V26" stroke="white" strokeWidth="2" transform={`rotate(${i*22.5-90} 80 80)`}/>)}<g className="ts-needle"><path d="M80 80 L80 24" stroke="#ff3030" strokeWidth="4"/><circle cx="80" cy="80" r="5" fill="white"/></g><g fill="white" fontSize="10"><text x="12" y="96">0</text><text x="69" y="42">120</text><text x="132" y="96">240</text></g></svg><b>OVERDRIVE</b></div></div>
 <div className="ts-road" aria-hidden="true"><div className="ts-lanes"/><div className="ts-streak"/><div className="ts-streak ts-second"/></div>
 <div className="ts-bottom"><span>GET TOP SPEED — SERVICE IN OVERDRIVE</span><button type="button" aria-pressed={boost} onClick={()=>setBoost(v=>!v)}>{boost?'OVERDRIVE ACTIVE':'ENGAGE OVERDRIVE'}</button><a href={bookingUrl} onPointerEnter={()=>setBoost(true)} onFocus={()=>setBoost(true)}>BOOK SERVICE</a></div></header>;
}
