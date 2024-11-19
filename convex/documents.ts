import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated!");

    const userId = identity.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });
    return document;
  },
});

export const getSidebarDocs = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated!");

    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const getById = query({
  args: {
    documentId:v.id("documents")
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const documents = await ctx.db.get(args.documentId)

    if(!documents) throw new Error('Document not found')

      if(documents.isPublished && !documents.isArchived) return documents;

      if (!identity) throw new Error("Not authenticated!");
        
        const userId = identity.subject;

        if(documents.userId !== userId) throw new Error("Not authorized!");
 
        return documents
    },
});


export const archiveDocs = mutation({
    args: {
        id: v.id("documents")
     },
     handler:async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) throw new Error("Not authenticated!");
        
        const userId = identity.subject;
        
        const existingsDocs = await ctx.db.get(args.id)
        if (!existingsDocs) throw new Error("Document not found!");

        if(existingsDocs.userId !== userId)throw new Error("Not authorized!");

        const recursiveArchive = async (documentId:Id<"documents">) =>{
            const children = await ctx.db.query("documents").withIndex("by_user_parent",(q)=>(
                q.eq("userId",userId)
                .eq("parentDocument",documentId)
            )).collect()

            for (const child of children) {
                await ctx.db.patch(child._id,{
                    isArchived:true
                })

                await recursiveArchive(child._id)
            }
        }

        const document =await ctx.db.patch(args.id,{
            isArchived:true
        })

        recursiveArchive(args.id)

        return document
     },
})



export const getArchivedDocs = query({
   
    handler: async (ctx) => {
      const identity = await ctx.auth.getUserIdentity();
  
      if (!identity) throw new Error("Not authenticated!");
  
      const userId = identity.subject;
  
      const documents = await ctx.db
        .query("documents")
        .withIndex("by_user", (q) =>
          q.eq("userId", userId)
        )
        .filter((q) => q.eq(q.field("isArchived"), true))
        .order("desc")
        .collect();
  
      return documents;
    },
  });

export const getSearchedDocs = query({
   
    handler: async (ctx) => {
      const identity = await ctx.auth.getUserIdentity();
  
      if (!identity) throw new Error("Not authenticated!");
  
      const userId = identity.subject;
  
      const documents = await ctx.db
        .query("documents")
        .withIndex("by_user", (q) =>
          q.eq("userId", userId)
        )
        .filter((q) => q.eq(q.field("isArchived"), false))
        .order("desc")
        .collect();
  
      return documents;
    },
  });


  export const restoreDoc = mutation({
    args: {
        id: v.id("documents")
     },
     handler:async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) throw new Error("Not authenticated!");
        
        const userId = identity.subject;
        
        const existingsDocs = await ctx.db.get(args.id)
        if (!existingsDocs) throw new Error("Document not found!");

        if(existingsDocs.userId !== userId)throw new Error("Not authorized!");

        const recursiveRestore = async (documentId:Id<"documents">) =>{
            const children = await ctx.db.query("documents").withIndex("by_user_parent",(q)=>(
                q.eq("userId",userId)
                .eq("parentDocument",documentId)
            )).collect()

            for (const child of children) {
                await ctx.db.patch(child._id,{
                    isArchived:false
                })

                 recursiveRestore(child._id)
            }
        }
        
        
        
        
        
        const options:Partial<Doc<"documents">> = {
            isArchived:false
        }
        
        if(existingsDocs.parentDocument){
            const parent = await ctx.db.get(existingsDocs.parentDocument)
            if(parent?.isArchived){
                options.parentDocument = undefined
            }
        }
        
      const document =  await ctx.db.patch(args.id,options)
         recursiveRestore(args.id)
        
        return document
     },
})

export const deleteDoc = mutation({
    args: {
        id: v.id("documents")
     },
     handler:async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) throw new Error("Not authenticated!");
        
        const userId = identity.subject;
        
        const existingsDocs = await ctx.db.get(args.id)
        if (!existingsDocs) throw new Error("Document not found!");
        if(existingsDocs.userId !== userId)throw new Error("Not authorized!");

        const document = ctx.db.delete(args.id)
        
        return document
        
     },
})

export const deleteIcon = mutation({
    args: {
        id: v.id("documents")
     },
     handler:async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) throw new Error("Not authenticated!");
        
        const userId = identity.subject;
        
        const existingsDocs = await ctx.db.get(args.id)
        if (!existingsDocs) throw new Error("Document not found!");
        if(existingsDocs.userId !== userId)throw new Error("Not authorized!");

        const document = ctx.db.patch(args.id,{
          icon:undefined
        })
        
        return document
        
     },
})


export const updateDoc = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    content: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated!");

    const userId = identity.subject;

    const {id,...rest} = args

    const existingsDocs = await ctx.db.get(args.id)
    if (!existingsDocs) throw new Error("Document not found!");

    if(existingsDocs.userId !== userId)throw new Error("Not authorized!");

    const document = await ctx.db.patch(id, {
     ...rest
    });
    return document;
  },
});

