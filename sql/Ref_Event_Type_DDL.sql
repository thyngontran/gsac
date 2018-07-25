/****** Object:  Table [dbo].[Ref_Event_Type]    Script Date: 7/25/2018 1:37:14 PM ******/
DROP TABLE [dbo].[Ref_Event_Type]
GO

/****** Object:  Table [dbo].[Ref_Event_Type]    Script Date: 7/25/2018 1:37:14 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Ref_Event_Type](
	[Event_Type_Id] [int] IDENTITY(1,1) NOT NULL,
	[Emergency_Type] [varchar](50) NOT NULL,
	[Description] [varchar](50) NOT NULL,
	[Icon] [varchar](50) NOT NULL,
	[Active_Ind] [int] NOT NULL,
 CONSTRAINT [PK_Ref_Event_Type] PRIMARY KEY CLUSTERED 
(
	[Event_Type_Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Ref_Event_Type] ADD CONSTRAINT active_ind_def   DEFAULT 1 FOR active_ind ;  
GO  



