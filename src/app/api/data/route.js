

import sql from 'mssql'

import { NextResponse } from 'next/server'
import {getConnection} from '@/lib/db'



export async function GET() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM TuTabla');
    
    return NextResponse.json(result.recordset);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener datos' }, { status: 500 });
  }
}

