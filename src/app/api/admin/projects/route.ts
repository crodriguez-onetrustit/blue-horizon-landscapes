import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'
import fsSync from 'fs'
import path from 'path'

const PROJECTS_FILE = path.join(process.cwd(), 'projects.json')

interface Project {
    id: string
    title: string
    category: string
    beforeImage: string
    afterImage: string
    description: string
    order: number
    createdAt: string
}

async function getProjectsDb(): Promise<Project[]> {
    try {
        const data = await fs.readFile(PROJECTS_FILE, 'utf-8')
        return JSON.parse(data)
    } catch {
        return []
    }
}

async function saveProjectsDb(data: Project[]) {
    await fs.writeFile(PROJECTS_FILE, JSON.stringify(data, null, 2))
}

export async function GET() {
    try {
        const projects = await getProjectsDb()
        return NextResponse.json({ projects: projects.sort((a, b) => a.order - b.order) })
    } catch (error) {
        console.error('Error fetching projects:', error)
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const { title, category, beforeImage, afterImage, description } = await request.json()
        
        if (!title || !category || !description) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const projects = await getProjectsDb()
        const newProject: Project = {
            id: uuidv4(),
            title,
            category,
            beforeImage: beforeImage || '/assets/showcase/photo1.jpg',
            afterImage: afterImage || '/assets/showcase/photo2.jpg',
            description,
            order: projects.length,
            createdAt: new Date().toISOString()
        }

        projects.push(newProject)
        await saveProjectsDb(projects)

        return NextResponse.json({ success: true, project: newProject })
    } catch (error) {
        console.error('Error creating project:', error)
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const { id, ...data } = await request.json()
        
        if (!id) {
            return NextResponse.json({ error: 'Project ID required' }, { status: 400 })
        }

        const projects = await getProjectsDb()
        const index = projects.findIndex(p => p.id === id)
        
        if (index === -1) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 })
        }

        projects[index] = { ...projects[index], ...data }
        await saveProjectsDb(projects)

        return NextResponse.json({ success: true, project: projects[index] })
    } catch (error) {
        console.error('Error updating project:', error)
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'Project ID required' }, { status: 400 })
        }

        const projects = await getProjectsDb()
        const index = projects.findIndex(p => p.id === id)
        
        if (index === -1) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 })
        }

        projects.splice(index, 1)
        await saveProjectsDb(projects)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting project:', error)
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
    }
}
