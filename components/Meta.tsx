import Head from 'next/head'
import React from 'react'

type MetaProps = {
    title: string;
    keywords: string;
    description: string;
}
const Meta = ({ title, keywords, description }: MetaProps) => {
    return (
        <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta charSet='utf-8' />
            <link rel="icon" href="/favicon.ico" />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name='keywords' content={keywords} />
        </Head>
    )
}

Meta.defaultProps = {
    title: 'Disney',
    description: 'Generated by create next app',
    keywords: 'Disney, Disney plus'
}

export default Meta
