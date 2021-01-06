import Layout from '../../components/layout'
import Head from 'next/head'
import { getAllPostIds, getPostData, PostEntry } from '../../lib/posts'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring';

export interface PostProps {
    postData: PostEntry   
}

export interface PostStaticParams extends ParsedUrlQuery {
    id: string;
}

export default function PostPage({ postData }: PostProps) {
    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            {postData.title}
            <br />
            {postData.id}
            <br />
            {postData.date}
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths<PostStaticParams> = async (context) => {
    // Return a list of possible value for id
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<PostProps, PostStaticParams> = async (context) => {
    const { params } = context;
    const postData = getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}